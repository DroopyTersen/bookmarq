import { EventEmitter } from "events";
import { v4 as uuidv4 } from "uuid";
interface JobContext<TJobData = any> {
  jobId: string;
  data: Partial<TJobData>;
}

interface JobStep {
  name: string;
  fn: (context: JobContext, emit: (eventType: string) => void) => Promise<void>;
}

export class JobDefinition<TJobData = any> {
  steps: JobStep[] = [];
  constructor(public name: string) {}

  registerStep(
    stepName: string,
    fn: (
      context: JobContext<TJobData>,
      emit: (eventType: string) => void
    ) => Promise<any>
  ) {
    this.steps.push({ name: stepName, fn });
  }
}

export const JOB_EVENTS = {
  JOB_COMPLETE: "JOB_COMPLETE",
  JOB_FAILED: "JOB_FAILED",
  STEP_START: "STEP_START",
  STEP_COMPLETE: "STEP_COMPLETE",
  STEP_FAILED: "STEP_FAILED",
} as const;

type LooseAutocomplete<T extends string> = T | Omit<string, T>;
export type JobEventType = LooseAutocomplete<keyof typeof JOB_EVENTS>;
export type JobEventData<TJobData> = {
  type: JobEventType;
  data: Partial<TJobData>;
  step?: string;
  error?: any;
};
export class JobRunner<TJobData = any> {
  public activeJobs: Map<string, TJobData>;
  private emitter: EventEmitter;
  public jobDefintion;

  constructor(job: JobDefinition<TJobData>) {
    this.emitter = new EventEmitter();
    this.jobDefintion = job;
    this.activeJobs = new Map();
  }
  public startJob = (initialJobData: TJobData, jobId = generateUUID()) => {
    this._runJob(initialJobData, jobId);
    return jobId;
  };
  private _runJob = async (jobData: TJobData, jobId: string) => {
    let existingJob = this.activeJobs.has(jobId);
    if (existingJob) {
      throw new Error("Job is already active: " + jobId);
    }
    this.activeJobs.set(jobId, jobData);

    let context: JobContext<TJobData> = {
      jobId,
      data: jobData,
    };
    try {
      // let emit = (data: JobEventData<TJobData>) => {
      // Run the steps sequentially
      for (let step of this.jobDefintion.steps) {
        let emit = (eventType: string) => {
          let eventData: JobEventData<TJobData> = {
            type: eventType,
            step: step.name,
            data: jobData,
          };
          this.emitter.emit(jobId, eventData);
        };
        emit(JOB_EVENTS.STEP_START);
        try {
          await step.fn(context, emit);
        } catch (error) {
          emit(JOB_EVENTS.STEP_FAILED);
          // Rethrow to fail the job
          throw error;
        }
        emit(JOB_EVENTS.STEP_COMPLETE);
      }

      this.emitter.emit(jobId, {
        type: JOB_EVENTS.JOB_COMPLETE,
        data: context.data,
      } satisfies JobEventData<TJobData>);
    } catch (error: unknown) {
      console.error("🚀 | _runJob | error:", jobId, error);
      console.error("🚀 | _runJob | error:", jobId, JSON.stringify(error));
      this.emitter.emit(jobId, {
        type: JOB_EVENTS.JOB_FAILED,
        data: context.data,
        error: {
          message: (error as Error)?.message,
          stack: (error as Error)?.stack,
        },
      } satisfies JobEventData<TJobData>);
    } finally {
      this.activeJobs.delete(jobId);
    }
  };

  subscribe = (jobId: string, cb: (data: JobEventData<TJobData>) => void) => {
    this.emitter.on(jobId, cb);
    return () => {
      this?.emitter?.off(jobId, cb);
    };
  };
}

const generateUUID = () => {
  return uuidv4();
};

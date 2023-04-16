import { EventEmitter } from "events";

interface JobContext<TJobData = any> {
  jobId: string;
  emitter: EventEmitter;
  data: Partial<TJobData>;
}

interface JobStep {
  name: string;
  fn: (context: JobContext) => Promise<void>;
}

export class JobDefinition<TJobData = any> {
  steps: JobStep[] = [];
  constructor(public name: string) {}

  registerStep(
    stepName: string,
    fn: (context: JobContext<TJobData>) => Promise<any>
  ) {
    this.steps.push({ name: stepName, fn });
  }

  run = async (
    jobId: string,
    input: Partial<TJobData>,
    emitter: EventEmitter
  ) => {
    let context: JobContext<TJobData> = {
      jobId,
      emitter,
      data: input,
    };
    // Run the steps sequentially
    for (let step of this.steps) {
      emitter.emit("step-change", {
        step: step.name,
        jobId,
        data: context.data,
      });
      await step.fn(context);
    }
  };
}

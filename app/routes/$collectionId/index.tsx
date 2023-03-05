import { Input } from "~/toolkit/components/forms";

export default () => {
  return (
    <main>
      <div className="max-w-2xl p-4 mx-auto mt-4 md:mt-10">
        <Input
          type="search"
          className="text-lg font-light rounded-full bg-base-200"
          aria-label="Search"
          autoFocus
          placeholder="Search or ask a question..."
        />
      </div>
    </main>
  );
};

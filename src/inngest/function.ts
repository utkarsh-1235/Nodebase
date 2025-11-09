import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    //Fetching the video
    await step.sleep("wait-a-moment", "5s");

    // Transcribing
    await step.sleep("wait-a-moment", "5s");

    //sending transcription
    await step.sleep("wait-a-moment", "5s");
    return { message: `Hello ${event.data.email}!` };
  },
);
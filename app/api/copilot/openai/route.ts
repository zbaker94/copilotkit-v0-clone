import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend";

export const runtime = "edge";

export async function POST(req: Request ) : Promise<Response> {
    const copilotKit = new CopilotBackend();

    const response =  copilotKit.response(req, new OpenAIAdapter());
    console.log({response})
    return response;
}
import { NextRequest, NextResponse } from "next/server";

type VercelDeploymentSuccessPayload = {
  event_type: "vercel.deployment.success";
  client_payload: {
    url: string;
    sha: string;
  };
};

function isVercelDeploymentSuccessPayload(
  payload: unknown,
): payload is VercelDeploymentSuccessPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const parsedPayload = payload as {
    event_type?: unknown;
    client_payload?: unknown;
  };

  if (parsedPayload.event_type !== "vercel.deployment.success") {
    return false;
  }

  if (!parsedPayload.client_payload || typeof parsedPayload.client_payload !== "object") {
    return false;
  }

  const clientPayload = parsedPayload.client_payload as {
    url?: unknown;
    sha?: unknown;
  };

  return (
    typeof clientPayload.url === "string" &&
    clientPayload.url.trim().length > 0 &&
    typeof clientPayload.sha === "string" &&
    clientPayload.sha.trim().length > 0
  );
}

export async function POST(req: NextRequest) {
  let requestBody: unknown;
  try {
    requestBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isVercelDeploymentSuccessPayload(requestBody)) {
    return NextResponse.json(
      {
        error:
          "Request body must match { event_type: 'vercel.deployment.success', client_payload: { url: string, sha: string } }",
      },
      { status: 400 },
    );
  }

  const deploymentUrl = requestBody.client_payload.url.trim();
  const deploymentSha = requestBody.client_payload.sha.trim();

  return NextResponse.json(
    {
      ok: true,
      event_type: requestBody.event_type,
      client_payload: {
        url: deploymentUrl,
        sha: deploymentSha,
      },
    },
    { status: 200 },
  );
}

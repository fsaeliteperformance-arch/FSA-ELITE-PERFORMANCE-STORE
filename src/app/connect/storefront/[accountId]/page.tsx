import ConnectedAccountStorefront from "@/components/connect/ConnectedAccountStorefront";

export default async function ConnectedStorefrontPage({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <ConnectedAccountStorefront accountId={accountId} />
    </div>
  );
}

import { Redirect } from "expo-router";
import { useStorage } from "@/infra/adapters/storage/hooks/useStorage";
import { StorageKeys } from "@/infra/adapters/storage/types";

export default function Index() {
  const storage = useStorage();
  const session = storage.getItemSync(StorageKeys.SESSION);

  if (!!session) {
    return <Redirect href={"/(app)/dashboard"} />;
  }

  return <Redirect href={"/(auth)/welcome"} />;
}

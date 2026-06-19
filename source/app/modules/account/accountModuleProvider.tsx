import AccountProvider from "@app/modules/account/states/accountProvider";
import AccountModule from "./accountModule";

export default function AccountModuleProvider() {
  return (
    <AccountProvider>
      <AccountModule />
    </AccountProvider>
  );
}

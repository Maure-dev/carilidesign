import ContactProvider from "@app/modules/contact/states/contactProvider";
import ContactModule from "./contactModule";

export default function ContactModuleProvider() {
  return (
    <ContactProvider>
      <ContactModule />
    </ContactProvider>
  );
}

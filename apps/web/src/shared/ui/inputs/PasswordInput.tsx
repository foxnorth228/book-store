import { Button } from "@org/ui";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "../../../../../../packages/ui/src/components/ui/Input";

export function PasswordInput({ ...props }: React.ComponentProps<typeof Input>) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input {...props} type={visible ? "text" : "password"} className="pr-10" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-1 -translate-y-1/2"
        onClick={() => setVisible((value) => !value)}
        aria-label={
          visible
            ? t((w) => w.hidePassword, { ns: "common" })
            : t((w) => w.showPassword, { ns: "common" })
        }
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
}

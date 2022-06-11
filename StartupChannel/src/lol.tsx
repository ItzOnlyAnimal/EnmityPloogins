import { FormInput, FormRow, FormSection } from "enmity/components";
import { React } from "enmity/metro/common";

export function getSettingsPanel({ settings }) {
    return <FormSection title="StartupChannel">
        <FormInput value={settings.get('startupChannel', '')}
            onChange={(s: string) => settings.set("startupChannel", s)}
            title="Desired channel to start in" />
    </FormSection>;
}
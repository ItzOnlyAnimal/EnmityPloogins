import { FormInput, FormRow, FormSection } from "enmity/components";
// @ts-ignore
const { React } = window.enmity.modules.common

export function getSettingsPanel({ settings }) {
    return <FormSection title="StartupChannel">
        <FormInput value={settings.get('startupChannel', '0', '')}
            onChange={(s: string) => settings.set("startupChannel", s)}
            title="Desired channel to start in" />
    </FormSection>;
}
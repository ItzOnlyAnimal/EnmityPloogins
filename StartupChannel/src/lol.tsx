import { FormInput, FormRow, FormSection } from "enmity/components";
//@ts-ignore
const React = window.enmity.modules.common.React

export function getSettingsPanel({ settings }) {
    return <React.FormSection title="StartupChannel">
        <React.FormRow label="Startup channel"
            trailing={
                <React.FormInput value={settings.get('startupChannel', '')}
                    onChange={(s: any) => settings.set("startupChannel", s)}
                    title="Desired channel to start in" />
            } />
    </React.FormSection>;
}
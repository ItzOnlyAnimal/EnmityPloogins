import { FormInput, FormRow, FormSection, FormSwitch } from "enmity/components";
import { React } from "enmity/metro/common";

export function getSettingsPanel({ settings }) {
    return <FormSection>
        <FormRow
            label='Mute Server'
            trailing={<FormSwitch
                value={settings.getBoolean('muted', false)}
                onValueChange={() => {
                    settings.toggle('muted', false);
                }}
            />}
        />
        <FormRow
            label='Change Nickname'
            trailing={<FormSwitch
                value={settings.getBoolean('changeNick', false)}
                onValueChange={() => {
                    settings.toggle('changeNick', false);
                }}
            />}
        />
        {settings.getBoolean('changeNick', false) && <FormInput
            value={settings.get('nickname', ' ')}
            onChange={(s: string) => settings.set("nickname", s)}
            title="Nickname to set" />}
        <FormSection title="Server Notification Settings">
            <FormRow
                label='All Messages'
                trailing={<FormSwitch
                    value={settings.get('notifLevel', 1) === 0}
                    onValueChange={() => {
                        settings.set('notifLevel', 0);
                    }}
                />}
            />
            <FormRow
                label='Only @mentions'
                trailing={<FormSwitch
                    value={settings.get('notifLevel', 1) === 1}
                    onValueChange={() => {
                        settings.set('notifLevel', 1);
                    }}
                />}
            />
            <FormRow
                label='Nothing'
                trailing={<FormSwitch
                    value={settings.get('notifLevel', 1) === 2}
                    onValueChange={() => {
                        settings.set('notifLevel', 2);
                    }}
                />}
            />
        </FormSection>
        <FormSection>
            <FormRow
                label='Suppress @everyone and @here'
                trailing={<FormSwitch
                    value={settings.getBoolean('suppressEveryone', false)}
                    onValueChange={() => {
                        settings.toggle('suppressEveryone', false);
                    }}
                />}
            />
            <FormRow
                label='Suppress All Role @mentions'
                trailing={<FormSwitch
                    value={settings.getBoolean('suppressRoles', false)}
                    onValueChange={() => {
                        settings.toggle('suppressRoles', false);
                    }}
                />}
            />
            <FormRow
                label='Mute New Events'
                trailing={<FormSwitch
                    value={settings.getBoolean('muteEvents', true)}
                    onValueChange={() => {
                        settings.toggle('muteEvents', true);
                    }}
                />}
            />
            <FormRow
                label='Mobile Push Notifications'
                trailing={<FormSwitch
                    value={settings.getBoolean('mobilePush', false)}
                    onValueChange={() => {
                        settings.toggle('mobilePush', false);
                    }}
                />}
            />
        </FormSection>
    </FormSection>;
}
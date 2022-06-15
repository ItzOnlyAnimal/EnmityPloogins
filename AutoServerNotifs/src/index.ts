import Manifest from './manifest.json'
import { getSettingsPanel } from './settings';
import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { filters, bulk } from 'enmity/modules';
import { get, getBoolean, set, toggle } from 'enmity/api/settings'
import { Guild } from 'enmity/common';

const [GuildNotifs, Nickname, Dispatcher /*guhh fix typing when, subscribe is missing*/ ] = bulk(
    filters.byProps('updateGuildNotificationSettings'),
    filters.byProps('changeNickname'),
    filters.byProps('dirtyDispatch')
)

const AutoServerNotifs: Plugin = {
    onStart() {
        // Dispatcher.subscribe('GUILD_CREATE', onGuildCreated)
    },

    onStop() {
        // Dispatcher.unsubscribe('GUILD_CREATE', onGuildCreated)
    },

    getSettingsPanel: getSettingsPanel,

    ...Manifest
};

function onGuildCreated(data: { guild: Guild }) {

    const settings = {
        muted: getBoolean('AutoServerNotifs', 'muted', false),
        message_notifications: get('AutoServerNotifs', 'notifLevel', 1),
        suppress_everyone: getBoolean('AutoServerNotifs', 'suppressEveryone', false),
        suppress_roles: getBoolean('AutoServerNotifs', 'suppressRoles', false),
        mute_scheduled_events: getBoolean('AutoServerNotifs', 'muteEvents', true),
        mobile_push: getBoolean('AutoServerNotifs', 'mobilePush', false),
    }
    GuildNotifs.updateGuildNotificationSettings(data.guild.id, settings);

    let changeNick = getBoolean('AutoServerNotifs', 'changeNick', false);
    let nickname = get('AutoServerNotifs', 'nickname');
    if (changeNick) {
        Nickname.changeNickname(data.guild.id, null, '@me', nickname);
    }
}

registerPlugin(AutoServerNotifs);
import Manifest from './manifest.json'
import { getSettingsPanel } from './settings';
import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { filters, bulk } from 'enmity/modules';
import { get, getBoolean} from 'enmity/api/settings'
import { Toasts } from 'enmity/metro/common';
import { Guild } from 'enmity/common';

const [GuildNotifs, Nickname, Dispatcher /*guhh fix typing when, subscribe is missing*/ ] = bulk(
    filters.byProps('updateGuildNotificationSettings'),
    filters.byProps('changeNickname'),
    filters.byProps('dirtyDispatch')
)

const AutoServerNotifs: Plugin = {
    onStart() {
        Dispatcher.subscribe('GUILD_CREATE', onGuildCreated)
    },

    onStop() {
        Dispatcher.unsubscribe('GUILD_CREATE', onGuildCreated)
    },

    getSettingsPanel: getSettingsPanel,

    ...Manifest
};

function onGuildCreated(data: { guild: Guild }) {
    console.log('beesechurger')
    const settings = {
        muted: getBoolean('AutoServerNotifs', 'muted', false),
        message_notifications: get('AutoServerNotifs', 'notifLevel', 1),
        suppress_everyone: getBoolean('AutoServerNotifs', 'suppressEveryone', false),
        suppress_roles: getBoolean('AutoServerNotifs', 'suppressRoles', false),
        mute_scheduled_events: getBoolean('AutoServerNotifs', 'muteEvents', true),
        mobile_push: getBoolean('AutoServerNotifs', 'mobilePush', false),
    }
    Toasts.open({
        content: `Setting notifications for ${data.guild.name}`
      });
    GuildNotifs.updateGuildNotificationSettings(data.guild.id, settings);

    let changeNick = getBoolean('AutoServerNotifs', 'changeNick', false);
    let nickname = get('AutoServerNotifs', 'nickname');
    if (changeNick) {
        Nickname.changeNickname(data.guild.id, null, '@me', nickname);
    }
}

registerPlugin(AutoServerNotifs);
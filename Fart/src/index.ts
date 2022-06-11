import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { Command, ApplicationCommandOptionType } from 'enmity/api/commands'
import { Users, Messages } from 'enmity/metro/common'
import { User } from 'enmity/common'
import Manifest from './manifest.json'

const Fart: Plugin = {
    commands: [],

    onStart() {
        const fart: Command = {
            id: "fart-command",
            name: "fart",
            description: "fart",
            options: [{
                name: "user",
                displayName: "user",

                description: "tell person to fart you know the deal",

                type: ApplicationCommandOptionType.User,
                required: true,
            }],

            async execute(args, message) {
                const user: User = await Users.getUser(args[0].value);

                Messages.sendMessage(message!.channel.id, {
                    validNonShortcutEmojis: [],
                    content: `<@${user.id}> fart`
                  });
            },

        }

        this.commands.push(fart);
    },

    onStop() {
        this.commands = [];
    },

    ...Manifest
};

registerPlugin(Fart);
import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { getByProps } from 'enmity/metro';
import { get } from 'enmity/api/settings'
import Manifest from './manifest.json'
import { getSettingsPanel } from './lol';

let tc = getByProps('transitionToChannel');

const StartupChannel: Plugin = {
   ...Manifest,

   onStart() {
      setTimeout(() => {
         let channel = get('StartupChannel', 'startupChannel');
         console.log('channel: ' + channel);
         if (channel != 0) tc.transitionToChannel(channel)
      }, 100);
   },
   onStop() { },

   getSettingsPanel: getSettingsPanel,
};

registerPlugin(StartupChannel);
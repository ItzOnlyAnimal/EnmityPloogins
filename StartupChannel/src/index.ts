import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { getByProps } from 'enmity/metro';
import { get } from 'enmity/api/settings'
import Manifest from './manifest.json'
import { getSettingsPanel } from './lol';

const Channels = getByProps('transitionToChannel');

const StartupChannel: Plugin = {
    ...Manifest,

   onStart() {
      Channels.transitionToChannel(get('startupChannel', 'q'));
   },
   onStop() {},

   getSettingsPanel: getSettingsPanel, 
};

registerPlugin(StartupChannel);
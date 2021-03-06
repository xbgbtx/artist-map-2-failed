import 'leaflet';
import 'leaflet-easybutton';
import { ArtistMapEvents, ArtistMapContext } from '../ArtistMapTypes.js';
import { dispatchAppEvent } from './AppEvents.js';

const sleep = (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

const { L } = window;

const attributionStr =
  '&copy; <a href="https://openstreetmap.org/copyright">' +
  'OpenStreetMap contributors</a> | ' +
  '<a href="https://www.wikidata.org" >Wikidata</a> | ' +
  '<a href="https://github.com/xbgbtx/ArtistMap" >Source Code</a>';

export function initLeaflet(ctx: ArtistMapContext) {
  const homeCoords: [number, number] = [0, 0];
  const homeZoom = 2;

  const map = L.map(ctx.mapDiv!).setView(homeCoords, homeZoom);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: attributionStr,
    noWrap: false,
  }).addTo(map);

  L.easyButton('<img class="button_icon" src="assets/globe.svg">', () => {
    map.flyTo(homeCoords, homeZoom);
  }).addTo(map);

  dispatchAppEvent({
    type: 'LeafletReady',
    map,
  } as ArtistMapEvents.LeafletReady);
}

export async function buildMap(ctx: ArtistMapContext) {
  await sleep(1000);
  setTimeout(() => {
    dispatchAppEvent({ type: 'MapBuildComplete' });
  }, 2000);
}

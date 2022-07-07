import { createMachine, interpret } from 'xstate'
import {
  ArtistMapContext,
} from './ArtistMapTypes.js'

function initialContext() {
  return {
    artists : []
  };
}

const artistMapMachine = createMachine<ArtistMapContext>(
  {
    id: 'artist-map',
    initial: 'init',
    context: initialContext(),

    states: {
      init: {
        on: {
          PageLoaded: {
            target: 'fetchingWikidata'
          }
        }
      },
      fetchingWikidata: {
      }
    }
  },
  {}
);

const artistMapService = interpret(artistMapMachine);

export { artistMapService };
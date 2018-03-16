import { polyfill } from 'es6-promise'; polyfill();
// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const SingleUserAPI = {
  singleUsers: [
    { id:'Home01', name: "Home Op1", position: "H", sub:"./" },
    { id:'Home02', name: "Home Op2", position: "H", sub:"./"  },
    { id:'Home03', name: "Home Op3", position: "H", sub:"./"  },
    { id:'Home04', name: "Home Op4", position: "H", sub:"./"  },
    { id:'personalData', name: "Personal Data", position: "U", sub:"/user"  },
    { id:'invitations', name: "Invitations", position: "U", sub:"/user"  },
    { id:'bankData', name: "Bank Data", position: "U", sub:"/user"  },
    { id:'subscriptionData', name: "Subscription Data", position: "U", sub:"/user"  },
    { id:'sessionData', name: "Session Data", position: "U", sub:"/user"  },
    { id:'deleteAccount', name: "Delete Account", position: "U", sub:"/user"  },
    { id:'Content01', name: "Contenido Listado Op1", position: "C", sub:"/content"  },
    { id:'Content02', name: "Contenido Listado Op2", position: "C", sub:"/content"  },
    { id:'Content03', name: "Contenido Listado Op3", position: "C", sub:"/content"  },
    { id:'Podcast01', name: "Podcast Op1", position: "P", sub:"/podcast"  },
    { id:'Podcast02', name: "Podcast Op2", position: "P", sub:"/podcast"  },
    { id:'Podcast03', name: "Podcast Op3", position: "P", sub:"/podcast"  },
    { id:'Podcast04', name: "Podcast Op4", position: "P", sub:"/podcast"  },
    { id:'channel', name: "channel", position: "F", sub:"/favourites"  },
    { id:'program', name: "program", position: "F", sub:"/favourites"  },
    { id:'podcast', name: "podcast", position: "F", sub:"/favourites"  }
  ],
  all: function() { return this.singleUsers},
  get: function(id) {
    const isSingleUser = p => p.id === id
    return this.singleUsers.find(isSingleUser)
  }
}

export default SingleUserAPI
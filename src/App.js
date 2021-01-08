import { ZoomMtg } from '@zoomus/websdk';
import "./zoom.css";
import AxiosLib from "./libs/axiosLib";
const qs = require('query-string');
// Uncomment this line if you are Building for Relative Paths (example: http://mywebsite.com/relativepath") and have set the "homepage" value in package.json - More info here: https://create-react-app.dev/docs/deployment/#building-for-relative-paths
// ZoomMtg.setZoomJSLib(process.env.PUBLIC_URL + '/node_modules/@zoomus/websdk/dist/lib', '/av')

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.5/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function App() {

  console.log("window.location.search",window.location.search);
  //=> '?foo=bar'
  
  const parsed = qs.parse(window.location.search);
  console.log("parsed: ",parsed);


//   setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  // var signatureEndpoint = 'http://localhost:9000'
  var apiKey = '9R6mzeU3TJy4E2gl2WcDaA'
  var meetingNumber = parsed.meetingNumber;
  var role = 0
  var leaveUrl = 'http://localhost:3000'
  var userName = 'arkEdison-test'
  var userEmail = ''
  var passWord = parsed.password;

  if(!meetingNumber || !passWord) return alert("params missing");

//   https://zoom.us/j/96605380998?pwd=M01iK21uL2ZUeUVjNWFFZFU2eXkxUT09


  async function getSignature(e) {
    e.preventDefault();
    
    const result =  await AxiosLib.POST('/zoom/signature',{
        meetingNumber: meetingNumber,
        role: role
      });

      console.log(result);
      if(!result.signature) return alert("no signature found");
      startMeeting(result.signature);


    // fetch(signatureEndpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     meetingNumber: meetingNumber,
    //     role: role
    //   })
    // }).then(res => res.json())
    // .then(response => {
    //     console.log("response: ",response);
    //   startMeeting(response.signature)
    // }).catch(error => {
    //   console.error(error)
    // })
  }

  function startMeeting(signature) {
      console.log("signature: ",signature);
    document.getElementById('zmmtg-root').style.display = 'block'

    // ZoomMtg.muteAll({
    //     muteAll: true
    // });

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="zoomApp">
      <main>
        <h1>Zoom WebSDK Sample React</h1>

        <button onClick={e=>getSignature(e)} >Join Meeting</button>
      </main>
    </div>
  );
}

export default App; 

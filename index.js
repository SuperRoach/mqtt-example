const client = new Paho.MQTT.Client("ws://iot.eclipse.org/ws", "myClientIdOfCool" + new Date().getTime());
const myTopic = "ubertopicthing";

client.connect({ onSuccess: onConnect })

let count = 0;

function onConnect() {
  
    console.log("connection successful");

    client.subscribe(myTopic);   //subscribe to our topic

    count++;

    message = "The count is now " + count;

    console.log(count);

  setInterval(()=>{
   publish(myTopic,                                
  message)
},5000)};                      //publish count every 5s

const publish = (topic, msg) => {  //takes topic and message string
    let message = new Paho.MQTT.Message(msg);

    message.destinationName = topic;

    client.send(message);
}

client.onMessageArrived = onMessageArrived;

function onMessageArrived(message) {

    let el= document.querySelector('#MQTTdata');

    el.innerHTML = message.payloadString

    document.body.appendChild(el)
}  

client.onConnectionLost = onConnectionLost;


function onConnectionLost(responseObject) {

    if (responseObject.errorCode !== 0) {

        console.log("onConnectionLost:" + responseObject.errorMessage);
  }

  client.connect({ onSuccess: onConnect });

}
import mqtt from "mqtt";

const client = mqtt.connect("ws://test.mosquitto.org:8080/mqtt");

export default client;

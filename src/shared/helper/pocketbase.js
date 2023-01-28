import pocketbase from "pocketbase";

export default function pocketbaseInstance() {
    return new pocketbase('https://roadmap-gen.iran.liara.run/')
}
import pocketbase from "pocketbase";

export default function pocketbaseInstance() {
    return new pocketbase(POCKETBASE_URL)
}
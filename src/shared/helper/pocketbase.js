import pocketbase from "pocketbase";
import { POCKETBASE_URL } from "../constants/config";

export default function pocketbaseInstance() {
    return new pocketbase(POCKETBASE_URL)
}
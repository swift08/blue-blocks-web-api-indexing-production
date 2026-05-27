import rawSiteData from "./site.json";
import { normalizeMojibakeDeep } from "@/lib/content/text";

const siteData = normalizeMojibakeDeep(rawSiteData);

export default siteData;

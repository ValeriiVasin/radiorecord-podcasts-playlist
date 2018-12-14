// Generated by https://quicktype.io

export interface FeedResponse {
  rss: RSS;
}

export interface RSS {
  "$":     RSSClass;
  channel: Channel[];
}

export interface RSSClass {
  "xmlns:itunes": string;
  version:        string;
  "xmlns:atom":   string;
}

export interface Channel {
  title:             string[];
  link:              string[];
  language:          string[];
  copyright:         string[];
  "atom:link":       AtomLinkElement[];
  "itunes:subtitle": string[];
  "itunes:author":   string[];
  "itunes:summary":  string[];
  description:       string[];
  "itunes:owner":    ItunesOwner[];
  "itunes:image":    ItunesImageElement[];
  "itunes:category": ItunesCategoryElement[];
  "itunes:explicit": string[];
  item:              Item[];
}

export interface AtomLinkElement {
  "$": AtomLink;
}

export interface AtomLink {
  href: string;
  rel:  string;
  type: string;
}

export interface ItunesCategoryElement {
  "$": ItunesCategory;
}

export interface ItunesCategory {
  text: string;
}

export interface ItunesImageElement {
  "$": ItunesImage;
}

export interface ItunesImage {
  href: string;
}

export interface ItunesOwner {
  "itunes:name":  string[];
  "itunes:email": string[];
}

export interface Item {
  title:             string[];
  "itunes:author":   ItunesAuthor[];
  "itunes:subtitle": string[];
  "itunes:summary":  string[];
  "itunes:image":    ItunesImageElement[];
  enclosure:         EnclosureElement[];
  guid:              string[];
  pubDate:           string[];
  description:       string[];
  "itunes:duration": string[];
  "itunes:explicit": ItunesExplicit[];
}

export enum ItunesAuthor {
  RadioRecord = "Radio Record",
}

export enum ItunesExplicit {
  Clean = "clean",
}

export interface EnclosureElement {
  "$": Enclosure;
}

export interface Enclosure {
  url:    string;
  length: string;
  type:   Type;
}

export enum Type {
  AudioMPEG = "audio/mpeg",
}
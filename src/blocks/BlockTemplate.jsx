import { HeroBlock } from "./Hero";
import { AboutBlock } from "./About";
import { BioBlock } from "./Bio";
import { GalleryBlock } from "./Gallery";
import { ContactBlock } from "./Contact";
import { PublicationsBlock } from "./Publications";

export function BlockTemplate({ block, updateBlock }) {
  const setData = (nextData) =>
    updateBlock(block.id, { data: nextData });

  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.data} onChange={setData} />;
    case "about":
      return <AboutBlock data={block.data} onChange={setData} />;
    case "bio":
      return <BioBlock data={block.data} onChange={setData} />;
    case "gallery":
      return <GalleryBlock data={block.data} onChange={setData} />;
    case "contact":
      return <ContactBlock data={block.data} onChange={setData} />;
    case "publications":
      return (
        <PublicationsBlock data={block.data} onChange={setData} />
      );
    default:
      return null;
  }
}

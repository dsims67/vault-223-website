import { useState } from "react";
import { MapPinIcon as MapPin } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function MapReveal() {
  const [loaded, setLoaded] = useState(false);
  if (loaded) {
    return (
      <iframe
        className="map-frame"
        title="Map showing Vault 223 at 223 North Main Street in Kokomo"
        src="https://www.google.com/maps?q=Vault%20223%2C%20223%20N%20Main%20St%2C%20Kokomo%2C%20IN%2046901&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }
  return (
    <div className="map-placeholder">
      <div className="map-dial" aria-hidden="true"><span>223</span></div>
      <p className="eyebrow">Downtown Kokomo</p>
      <h2>See us on the map</h2>
      <p>The map loads only when you ask for it.</p>
      <Button onClick={() => setLoaded(true)}><MapPin size={20} weight="fill" /> Load map</Button>
    </div>
  );
}

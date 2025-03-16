"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "@app/utils";

export default function LocationField() {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "";
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey,
        libraries,
    });

    const [input, setInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isLoaded || loadError || !inputRef.current) return;

        const options = {
            componentRestrictions: { country: "us" },
            fields: ["address_components"],
        };

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current as HTMLInputElement, options);
        autocomplete.addListener("place_changed", () => {
            handlePlaceChanged(autocomplete);
        });
        console.log(autocomplete);
    }, [isLoaded, loadError]);

    const handlePlaceChanged = (autocomplete: google.maps.places.Autocomplete) => {
        console.log("handlePlaceChanged called");
        const place = autocomplete.getPlace();
        console.log("place", place);
        if (!place || !place.geometry) {
            setInput("");
            return;
        }
        
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInput(value);
    };

    return (
        <input
            ref={inputRef}
            name="location"
            type="text"
            className="input"
            placeholder="Location"
            required
            value={input}
            onChange={handleChange}
        />
    );
}
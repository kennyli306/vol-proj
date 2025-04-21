"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "@app/utils";

export default function AddressField() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "",
        libraries,
    });

    const [input, setInput] = useState<string>("");
    const addressRef = useRef<HTMLInputElement>(null);
    const latitude = useRef<HTMLInputElement>(null);
    const longitude = useRef<HTMLInputElement>(null);
    const streetNumberRef = useRef<HTMLInputElement>(null);
    const streetNameRef = useRef<HTMLInputElement>(null);
    const neighborhoodRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const countyRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (!isLoaded || loadError || !addressRef.current) return;

        const options = {
            componentRestrictions: { country: "us" },
            fields: ["address_components", "formatted_address", "geometry"],
        };

        const autocomplete = new google.maps.places.Autocomplete(addressRef.current as HTMLInputElement, options);
        autocomplete.addListener("place_changed", () => {
            handlePlaceChanged(autocomplete);
        });
    }, [isLoaded, loadError]);

    const handlePlaceChanged = (autocomplete: google.maps.places.Autocomplete) => {
        const place = autocomplete.getPlace();
        if (!place || !place.address_components) {
            console.warn("Place or address components are missing");
            return;
        }

        const getComponent = (type: string) => {
            const component = place.address_components!.find((c) => c.types.includes(type));
            return component ? component.long_name : "";
        };

        if (addressRef.current) {
            addressRef.current.value = place.formatted_address || "";
        }
        if (place.geometry && place.geometry.location) {
            if (latitude.current) {
                latitude.current.value = place.geometry.location.lat().toString() || "";
            }
            if (longitude.current) {
                longitude.current.value = place.geometry.location.lng().toString() || "";
            }
        }

        if (streetNumberRef.current) {
            streetNumberRef.current.value = getComponent("street_number");
        }
        if (streetNameRef.current) {
            streetNameRef.current.value = getComponent("route");
        }
        if (neighborhoodRef.current) {
            neighborhoodRef.current.value = getComponent("neighborhood");
        }
        if (cityRef.current) {
            cityRef.current.value = getComponent("locality");
        }
        if (countyRef.current) {
            countyRef.current.value = getComponent("administrative_area_level_2");
        }
        if (stateRef.current) {
            stateRef.current.value = getComponent("administrative_area_level_1");
        }
        if (countryRef.current) {
            countryRef.current.value = getComponent("country");
        }
        if (postalCodeRef.current) {
            postalCodeRef.current.value = getComponent("postal_code");
        }
    };

    return (
        <div>
            <input
                ref={addressRef}
                name="address"
                type="text"
                className="input w-full"
                placeholder="Address"
                required
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <input ref={latitude} type="hidden" name="latitude" />
            <input ref={longitude} type="hidden" name="longitude" />
            <input ref={streetNumberRef} type="hidden" name="street_number" />
            <input ref={streetNameRef} type="hidden" name="street_name" />
            <input ref={neighborhoodRef} type="hidden" name="neighborhood" />
            <input ref={cityRef} type="hidden" name="city" />
            <input ref={countyRef} type="hidden" name="county" />
            <input ref={stateRef} type="hidden" name="state" />
            <input ref={countryRef} type="hidden" name="country" />
            <input ref={postalCodeRef} type="hidden" name="postal_code" />
        </div>
    );
}
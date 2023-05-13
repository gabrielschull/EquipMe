import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Gear } from "../../types/gear.type";
import { RootState, AppDispatch } from "../../Redux/store";
import { setAllGear } from "../../Redux/GearSlice";
import { useNavigate } from "react-router-dom";
import { supabase, supabaseClient } from "../../services/supabase.service";
import Socials from "../misc/Socials";

const GearListings: React.FC = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const gear = useSelector((state: RootState) => state.Gear);
  const userInfo = useSelector((state: RootState) => state.User);
  const [homeGearImages, setHomeGearImages] = useState<any>({});
  const filteredGear = useSelector((state: RootState) => state.FilteredGear);

  const CDNURL =
    "https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/";


  const [owners, setOwners] = useState<{ [key: string]: string }>({});
  const [distances, setDistances] = useState<{ [key: string]: string }>({});


  const navigate = useNavigate();

  const getOwnerFirstName = async (ownerId: string) => {
    const owner = await supabase.getUserById(ownerId);
    setOwners((prevState) => ({
      ...prevState,
      [ownerId]: owner?.first_name ?? "",
    }));
  };

  const getOwnerDistanceFromUser = async (ownerId: string) => {
    const owner = await supabase.getUserById(ownerId);
    const ownerLocation = owner?.location;
    const userLocation = userInfo.profile.location;

    if (ownerLocation && userInfo.profile.location) {
      const [ownerLat, ownerLng] = ownerLocation.split(",").map(parseFloat);
      const [userLat, userLng] = userLocation.split(",").map(parseFloat);

      const earthRadius = 6371;
      const dLat = ((userLat - ownerLat) * Math.PI) / 180;
      const dLng = ((userLng - ownerLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2)
        Math.cos((ownerLat * Math.PI) / 180) *
          Math.cos((userLat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;

      setDistances((prevState) => ({
        ...prevState,
        [ownerId]: `${distance.toFixed(1)} km`,
      }));
    }
  };

  async function getHomeGearImages(
    ownerid: string | null | undefined,
    gearid: string | null | undefined
  ) {
    try {
      const { data, error } = await supabaseClient.storage
        .from("gearImagesBucket")
        .list(`${ownerid}/gear/${gearid}`, {
          limit: 1,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      console.log(`${ownerid}/gear/${gearid}`);

      if (error) console.log("ERROR IN IMAGE FETCH ==> ", error);

      if (data !== null && data.length > 0) {
        console.log(data, "YARRRR");
        setHomeGearImages((state: any) => {
          return {...state, [ gearid as string ] : data[0].name}
        });
      }
    } catch (e: any) {
      console.log(e, "Error getting gear images");
    }
  }

  useEffect(() => {
    filteredGear.forEach((g: Gear) => {
      if (!owners[g.owner_id!] && g.owner_id !== userInfo.id) {
        getOwnerFirstName(g.owner_id!);
        getOwnerDistanceFromUser(g.owner_id!);
        getHomeGearImages(g.owner_id, g.id);
        console.log(g, "GEARHERE")
      }
    });
  }, [filteredGear, owners, userInfo.id]);

  console.log("homegearimg ==>", homeGearImages)

  const sortedGear = filteredGear.slice().sort((gearA: Gear, gearB: Gear) => {
    const distanceA = parseFloat(distances[gearA.owner_id!] || 'Infinity');
    const distanceB = parseFloat(distances[gearB.owner_id!] || 'Infinity');

    if (distanceA < distanceB) {
      return -1;
    } else if (distanceA > distanceB) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <ul role="list" className="divide-y divide-gray-100 mx-12 ">
      {sortedGear
        .filter((gear: Gear) => {
          return gear.owner_id !== userInfo.profile.id;
        })
        .map((gear: Gear, index) => (
          <li key={gear.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p
                  style={{ width: "450px" }}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {gear.description}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                  {" "}
                  €{gear.price_hr} / hour
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                  €{gear.price_day} / day
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                  Type:{gear.type}
                </p>
              </div>
            </div>
            {homeGearImages[gear.id!] && homeGearImages ? (
              <div
                style={{ paddingRight: "20px", paddingLeft: "20px" }}
                key={homeGearImages[gear.id!]}
                className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"
              >
                <img
                  src={
                    CDNURL +
                    gear.owner_id +
                    "/gear/" +
                    gear.id +
                    "/" +
                    homeGearImages[gear.id!]
                  }
                  alt=""
                  className="h-full w-full object-cover object-center"
                  style={{
                    width: "18vmin",
                    height: "24vmin",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "5px",
                  }}
                />
              </div>
            ) : (
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src="https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/gearImagesBucket/3ae36b25-4df5-44de-b66e-18eb88458a30/gear/cb7fc4d2-a61d-4427-aa99-8b298258b9ce/Screenshot%202023-05-12%20at%2009.14.47.png"
                  alt=""
                  className="h-full w-full object-cover object-center"
                  style={{ width: "18vmin", height: "24vmin" }}
                />
              </div>
            )}
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                Gear owner: {owners[gear.owner_id!]}
              </p>
              <Socials></Socials>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {" "}
                Distance:{" "}
                {distances[gear.owner_id!]
                  ? distances[gear.owner_id!]
                  : "unknown"}
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                &#9733; {gear.rating}
              </p>
              <form className="mt-10">
                <button
                  style={{
                    height: "80px",
                    width: "200px",
                    whiteSpace: "nowrap",
                  }}
                  type="submit"
                  onClick={() =>
                    navigate(`/geardetails/${gear.id}`, { state: { gear } })
                  }
                  className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-3  rounded shadow border-transparent"
                >
                  See more details
                </button>
              </form>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default GearListings;

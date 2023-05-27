import { ModelFeatures } from "../components/FeaturesForm";

export default async function requestPrediction(
  features: ModelFeatures
): Promise<number> {
  const response = await fetch("/api/predict", {
    method: "POST",
    body: JSON.stringify(features),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = (await response.json()) as number;

  return data;
}

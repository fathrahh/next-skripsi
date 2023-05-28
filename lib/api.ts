import { ModelFeatures } from "../app/components/FeaturesForm";

type Response = {
  predict: string;
};

export default async function requestPrediction(
  features: ModelFeatures
): Promise<Response> {
  const response = await fetch("/api/predict", {
    method: "POST",
    body: JSON.stringify(features),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = (await response.json()) as Response;

  return data;
}

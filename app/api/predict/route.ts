import axios from "axios";
import { NextResponse } from "next/server";
import { ModelFeatures } from "../../components/FeaturesForm";

export async function POST(request: Request) {
  // Lanjut bsk lagi gw ngantuk ye google
  const body = (await request.json()) as ModelFeatures;

  if (!body) {
    return NextResponse.json({
      predict: "Tidak diisi dengan benar",
    });
  }
  // const functionsClient = new CloudFunctionsServiceClient({
  //   apiEndpoint: "https://function-2-ytw3ur637q-uc.a.run.app",
  // });

  const { data } = await axios.post(
    process.env.GCLOUD_FUNCTION_URL as string,
    body
  );

  return NextResponse.json({ predict: data });
}

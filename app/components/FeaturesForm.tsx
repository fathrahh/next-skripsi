"use client";

import { Button, Input, Option, Select } from "./../../lib/mui-tailwind";
import { FormEvent, useState } from "react";

import { features } from "../../const";
import requestPrediction from "../../lib/api";

export type ModelFeatures = {
  age: number;
  gender: number;
  hypertension: number;
  heartDisease: number;
  everMarried: number;
  workType: number;
  residentType: number;
  avgGlucoseLevel: number;
  bmi: number;
  smokingStatus: number;
};

export default function FeaturesForm() {
  const [residentType, setResidentType] = useState("");
  const [smokingStatus, setSmokingStatus] = useState("");
  const [everMarried, setEverMarried] = useState("");
  const [workType, setWorkType] = useState("");
  const [gender, setGender] = useState("");
  const [heartDisease, setHeartDisease] = useState("");
  const [hypertension, setHypertension] = useState("");

  const onSubmitForm = async (
    ev: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const features: Record<string, string> = {
      residentType,
      smokingStatus,
      everMarried,
      workType,
      gender,
      heartDisease,
      hypertension,
      ...Object.fromEntries(formData),
    };

    const modelFeatures = Object.fromEntries(
      Object.entries(features).map(([key, value]) => {
        return [key, Number(value)];
      })
    ) as ModelFeatures;

    const response = await requestPrediction(modelFeatures);

    alert(`Stroke : ${response.predict}`);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <Input
          required
          name="age"
          type="number"
          className="col-span-1"
          size="md"
          color="green"
          label="Age"
        />
        <Input
          required
          name="bmi"
          type="number"
          className="col-span-1"
          size="md"
          label="BMI (kg)"
          color="green"
          step="0.01"
        />
        <Input
          required
          name="avgGlucoseLevel"
          type="number"
          className="col-span-1"
          size="md"
          label="Average Glucose Level"
          color="green"
          step="0.01"
        />
        {/* Gender */}
        <Select
          color="green"
          value={gender}
          onChange={(value) => setGender(value ?? "")}
          name="gender"
          label="Gender"
        >
          {features.gender.map((gender, idx) => (
            <Option key={idx} value={idx.toString()}>
              {gender}
            </Option>
          ))}
        </Select>
        {/* Heart Disease */}
        <Select
          color="green"
          value={heartDisease}
          onChange={(value) => setHeartDisease(value ?? "")}
          name="heartDisease"
          label="Heart Disease"
        >
          {features.heartDisease.map((heartDisease, idx) => (
            <Option key={idx} value={idx.toString()}>
              {heartDisease}
            </Option>
          ))}
        </Select>
        {/* Hypertension */}
        <Select
          color="green"
          value={hypertension}
          onChange={(value) => setHypertension(value ?? "")}
          name="hypertension"
          label="Hypertension"
        >
          {features.hypertension.map((hypertension, idx) => (
            <Option key={idx} value={idx.toString()}>
              {hypertension}
            </Option>
          ))}
        </Select>
        {/* Smoking Status */}
        <Select
          color="green"
          value={smokingStatus}
          onChange={(value) => setSmokingStatus(value ?? "")}
          name="smokingStatus"
          label="Smoking Status"
        >
          {features.smokingStatus.map((smokingStatus, idx) => (
            <Option key={idx} value={idx.toString()}>
              {smokingStatus}
            </Option>
          ))}
        </Select>
        {/* Lokasi Tinggal */}
        <Select
          color="green"
          value={residentType}
          onChange={(value) => setResidentType(value ?? "")}
          name="lokasiTinggal"
          label="Resident Type"
        >
          {features.residenceType.map((residentType, idx) => (
            <Option key={idx} value={idx.toString()}>
              {residentType}
            </Option>
          ))}
        </Select>
        {/* Ever Married */}
        <Select
          color="green"
          value={everMarried}
          onChange={(value) => setEverMarried(value ?? "")}
          name="everMarried"
          label="Ever Married"
        >
          {features.everMarried.map((everMarried, idx) => (
            <Option key={idx} value={idx.toString()}>
              {everMarried}
            </Option>
          ))}
        </Select>
        {/* Work Type */}
        <Select
          color="green"
          value={workType}
          onChange={(value) => setWorkType(value ?? "")}
          name="workType"
          label="Work Type"
        >
          {features.workType.map((workType, idx) => (
            <Option key={idx} value={idx.toString()}>
              {workType}
            </Option>
          ))}
        </Select>
      </div>
      <Button type="submit" variant="gradient" className="mt-4" color="orange">
        Predict
      </Button>
    </form>
  );
}

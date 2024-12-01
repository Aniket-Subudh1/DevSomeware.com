"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/util";

const steps = ["Basic Info", "Technical BG", "Intentions", "Summary"];

const Leadform = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    languages: "",
    frameworks: "",
    projects: "",
    interests: [] as string[],
    whyJoin: "",
    expectations: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((interest) => interest !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = () => {
    const stepErrors: { [key: string]: string } = {};
    switch (currentStep) {
      case 0:
        if (!formData.name) stepErrors.name = "Name is required.";
        if (!formData.email) {
          stepErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          stepErrors.email = "Invalid email format.";
        }
        if (!formData.password) stepErrors.password = "Password is required.";
        if (!formData.github) {
          stepErrors.github = "GitHub link is required.";
        } else if (
          !/^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/.test(
            formData.github
          )
        ) {
          stepErrors.github = "Invalid GitHub URL.";
        }
        if (!formData.linkedin) {
          stepErrors.linkedin = "LinkedIn link is required.";
        } else if (
          !/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/.test(
            formData.linkedin
          )
        ) {
          stepErrors.linkedin = "Invalid LinkedIn URL.";
        }
        break;
      case 1:
        if (!formData.languages)
          stepErrors.languages = "Languages are required.";
        if (!formData.frameworks)
          stepErrors.frameworks = "Frameworks are required.";
        break;
      case 2:
        if (!formData.whyJoin)
          stepErrors.whyJoin = "Please explain why you want to join.";
        if (!formData.expectations)
          stepErrors.expectations = "Please share your expectations.";
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form Data Submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <LabelInputContainer>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="DevSomeware"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="devsomeware@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="github">GitHub Link</Label>
              <Input
                id="github"
                name="github"
                type="url"
                placeholder="https://github.com/username"
                value={formData.github}
                onChange={handleChange}
              />
              {errors.github && (
                <p className="text-red-500 text-sm">{errors.github}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="linkedin">LinkedIn Link</Label>
              <Input
                id="linkedin"
                name="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={handleChange}
              />
              {errors.linkedin && (
                <p className="text-red-500 text-sm">{errors.linkedin}</p>
              )}
            </LabelInputContainer>
          </div>
        );
      case 1:
        return (
          <div>
            <LabelInputContainer>
              <Label htmlFor="languages">Known Programming Languages</Label>
              <Input
                id="languages"
                name="languages"
                placeholder="e.g., JavaScript, Python"
                type="text"
                value={formData.languages}
                onChange={handleChange}
              />
              {errors.languages && (
                <p className="text-red-500 text-sm">{errors.languages}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="frameworks">Known Frameworks</Label>
              <Input
                id="frameworks"
                name="frameworks"
                placeholder="e.g., React, Django"
                type="text"
                value={formData.frameworks}
                onChange={handleChange}
              />
              {errors.frameworks && (
                <p className="text-red-500 text-sm">{errors.frameworks}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="projects">Projects</Label>
              <textarea
                id="projects"
                name="projects"
                placeholder="Describe the projects you've worked on or are currently working on."
                value={formData.projects}
                onChange={handleChange}
                className="border px-4 py-2 w-full"
                rows={4}
              ></textarea>
              {errors.projects && (
                <p className="text-red-500 text-sm">{errors.projects}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Domain of Interest to Lead</Label>
              <div className="flex flex-wrap gap-4">
                {[
                  "AR/VR",
                  "AI/ML",
                  "Blockchain",
                  "Fullstack",
                  "Cloud/DevOps",
                ].map((interest) => (
                  <label key={interest} className="flex items-center space-x-0">
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </LabelInputContainer>
          </div>
        );
      case 2:
        return (
          <div>
            <LabelInputContainer>
              <Label htmlFor="whyJoin">
                Why do you want to join DevSomeware as a Lead, and what are your
                previous experiences with the particular tech stack? Please
                share details about your projects.
              </Label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                placeholder="Explain briefly"
                value={formData.whyJoin}
                onChange={handleChange}
                className="border px-4 py-2 w-full"
                rows={4}
              ></textarea>
              {errors.whyJoin && (
                <p className="text-red-500 text-sm">{errors.whyJoin}</p>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="expectations">
                What are your expectations from DevSomeware? Can you commit to
                this program, and are you eager to contribute to the community?
              </Label>
              <textarea
                id="expectations"
                name="expectations"
                placeholder="Explain briefly"
                value={formData.expectations}
                onChange={handleChange}
                className="border px-4 py-2 w-full"
                rows={4}
              ></textarea>
              {errors.expectations && (
                <p className="text-red-500 text-sm">{errors.expectations}</p>
              )}
            </LabelInputContainer>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-2xl font-bold text-center mb-6">Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Personal Information Box */}
              <div className="p-4 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800">
                <h4 className="text-lg text-purple-500 font-semibold mb-2">
                  Personal Information
                </h4>
                <p className="mb-2 break-words">
                  <strong>Name:</strong> {formData.name}
                </p>
                <p className="mb-2 break-words">
                  <strong>Email:</strong> {formData.email}
                </p>
                <p className="mb-2 break-words">
                  <strong>GitHub:</strong>{" "}
                  <a
                    href={formData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {formData.github}
                  </a>
                </p>
                <p className="break-words">
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href={formData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {formData.linkedin}
                  </a>
                </p>
              </div>
              <div className="p-4 border rounded-md shadow-sm  bg-gray-50 dark:bg-gray-800">
                <h4 className="text-lg font-semibold text-purple-500 mb-2">
                  Technical Background
                </h4>
                <p className="mb-2 break-words">
                  <strong>Languages:</strong> {formData.languages}
                </p>
                <p className="mb-2 break-words">
                  <strong>Frameworks:</strong> {formData.frameworks}
                </p>
                <p className="break-words">
                  <strong>Projects:</strong> {formData.projects}
                </p>
              </div>

              <div className="p-4 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800">
                <h4 className="text-lg font-semibold mb-2 text-purple-500 ">
                  Motivations
                </h4>
                <p className="mb-2 break-words">
                  <strong>Interests:</strong> {formData.interests.join(", ")}
                </p>
                <p className="mb-2 break-words">
                  <strong>Why Join:</strong> {formData.whyJoin}
                </p>
                <p className="break-words">
                  <strong>Expectations:</strong> {formData.expectations}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="lg:max-w-screen-md sm:max-w-screen-sm max-h-screen mx-auto rounded-none md:rounded-2xl p-4 md:p-12 shadow-input bg-white dark:bg-black mb-4"
      style={{ minHeight: "900px" }}
    >
      <h2 className="font-bold text-3xl text-center text-neutral-800 dark:text-neutral-200 mb-4">
        Join Devsomeware as Lead/Co-lead
      </h2>
      <div className="flex flex-col items-center mb-5">
        {/* Progress Bar */}
        <div className="flex items-center justify-between w-full sm:ml-[2rem] lg:ml-[8rem] max-w-4xl my-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center w-full">
              <div
                className={`relative flex items-center justify-center w-12 h-12 rounded-full ${
                  index <= currentStep
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {index === currentStep && (
                  <div className="absolute w-16 h-16 bg-purple-500 opacity-30 rounded-full animate-pulse"></div>
                )}
                <span className="z-10 text-lg font-bold">{index + 1}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-grow h-1 mx-2 ${
                    index < currentStep ? "bg-purple-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full lg:max-w-[35.5rem] sm:max-w-[34.5rem] mt-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center text-sm ${
                index === currentStep
                  ? "text-purple-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-6" style={{ minHeight: "200px" }}>
          {renderStepContent()}
        </div>
        <div className="flex justify-between">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-28 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            &larr; Previous
            <BottomGradient />
          </button>
          {/* Next or Submit Button */}
          {currentStep === steps.length - 1 ? (
            <Link
              href="/verification"
              className="bg-gradient-to-br py-2 text-center relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-24 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            >
              Submit
              <BottomGradient />
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-24 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            >
              Next &rarr;
              <BottomGradient />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

import { ReactNode } from "react";

const LabelInputContainer = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col mb-5 space-y-2 w-full", className)}>
    {children}
  </div>
);
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default Leadform;

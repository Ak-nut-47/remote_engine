import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  VStack,
  Text,
  CloseButton,
  Flex,
  Grid,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const DeveloperOnboardingForm = () => {
  const toast = useToast();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "a",
    selectedSkills: [],
    professionalExperience: [
      { companyName: "", techStack: "", selectedSkills: [], timePeriod: "" },
    ],
    educationalExperience: [{ degreeName: "", schoolName: "", timePeriod: "" }],
  });

  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    console.log("formState:", formState);
    console.log("selectedSkills:", formState.selectedSkills);
    // Fetch predefined skills from the backend
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:3001/skills/all");
        setAllSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, [formState.selectedSkills]);

  const handleInputChange = (field, value, index = null, subfield = null) => {
    setFormState((prev) => {
      if (index !== null && subfield !== null) {
        const newArray = [...prev[field]];
        newArray[index][subfield] = value;
        return { ...prev, [field]: newArray };
      } else {
        // Ensure selectedSkills is always an array
        const selectedSkills = Array.isArray(value) ? value : [value];
        return { ...prev, [field]: selectedSkills };
      }
    });
  };

  const handleSkillSelection = (field, experienceIndex, skill) => {
    const experience = formState[field][experienceIndex];
    if (experience.selectedSkills.includes(skill)) {
      // Skill is already selected, show error message or handle as needed
      toast({
        title: `Skill '${skill}' is already added for this experience.`,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else {
      // Add the skill to the selectedSkills array for the specific experience
      setFormState((prev) => {
        const newArray = [...prev[field]];
        newArray[experienceIndex].selectedSkills = [
          ...experience.selectedSkills,
          skill,
        ];
        return { ...prev, [field]: newArray };
      });
    }
  };

  const handleAddExperience = (field) => {
    setFormState((prev) => ({
      ...prev,
      [field]: [...prev[field], { selectedSkills: [] }],
    }));
  };

  const handleRemoveExperience = (field, index) => {
    setFormState((prev) => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const handleRemoveSkill = (field, experienceIndex, skillIndex) => {
    setFormState((prev) => {
      const newArray = [...prev[field]];
      newArray[experienceIndex].selectedSkills.splice(skillIndex, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = async () => {
    let finalFormState = { ...formState, selectedSkills: selectedSkills };

    console.log(finalFormState);
    // Uncomment the following lines when ready to submit to the backend
    try {
      const response = await axios.post(
        "http://localhost:3001/onboarding",
        formState
      );
      console.log("Onboarding submitted:", response.data);
    } catch (error) {
      console.error("Error submitting onboarding:", error);
    }
  };

  return (
    <>
      <Text fontSize={"xx-large"}>
        <b>
          <u>Hello Developer</u>
        </b>
      </Text>
      <Box
        p={8}
        maxWidth="500px"
        mx="auto"
        boxShadow="0px 0px 10px rgba(85, 107, 47, 0.5)"
        bg="white"
      >
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={formState.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={formState.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              value={formState.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={formState.email} isReadOnly />
          </FormControl>
          {/* ------------------------------------Skills---------- */}

          <FormControl>
            <FormLabel color={"maroon"}>
              <b>
                <u>Professional Experiences</u>
              </b>
            </FormLabel>
            {formState.professionalExperience.map(
              (experience, experienceIndex) => (
                <VStack key={experienceIndex} spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Company Name</FormLabel>
                    <Input
                      type="text"
                      value={experience.companyName}
                      onChange={(e) =>
                        handleInputChange(
                          "professionalExperience",
                          e.target.value,
                          experienceIndex,
                          "companyName"
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tech Stack</FormLabel>
                    <Input
                      type="text"
                      value={experience.techStack}
                      onChange={(e) =>
                        handleInputChange(
                          "professionalExperience",
                          e.target.value,
                          experienceIndex,
                          "techStack"
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Skills Used</FormLabel>
                    <Select
                      placeholder="Select skills"
                      value={experience.selectedSkills}
                      onChange={(e) =>
                        handleSkillSelection(
                          "professionalExperience",
                          experienceIndex,
                          e.target.value
                        )
                      }
                    >
                      {allSkills.map((skill) => (
                        <option key={skill._id} value={skill.name}>
                          {skill.name}
                        </option>
                      ))}
                    </Select>
                    <Box mt={2}>
                      <Grid gridTemplateColumns={"repeat(3, 1fr)"} gap={3}>
                        {experience.selectedSkills.map((el, skillIndex) => (
                          <Flex
                            key={skillIndex}
                            justifyContent={"center"}
                            alignItems={"center"}
                            border={"1px solid #808000"}
                            borderRadius={"40px"}
                            fontWeight={"bold"}
                            color={"#808000"}
                          >
                            {/* Display the skill and a CloseButton */}
                            <Text>{el}</Text>
                            <CloseButton
                              size="lg"
                              onClick={() =>
                                handleRemoveSkill(
                                  "professionalExperience",
                                  experienceIndex,
                                  skillIndex
                                )
                              }
                              ml={2}
                            >
                              &times;
                            </CloseButton>
                          </Flex>
                        ))}
                      </Grid>
                    </Box>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Time Period</FormLabel>
                    <Input
                      type="text"
                      value={experience.timePeriod}
                      onChange={(e) =>
                        handleInputChange(
                          "professionalExperience",
                          e.target.value,
                          experienceIndex,
                          "timePeriod"
                        )
                      }
                    />
                  </FormControl>
                </VStack>
              )
            )}
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => handleAddExperience("professionalExperience")}
            >
              Add Another Professional Experience
            </Button>
            {formState.professionalExperience.length > 1 && (
              <Button
                variant="outline"
                colorScheme="red"
                onClick={() =>
                  handleRemoveExperience(
                    "professionalExperience",
                    formState.professionalExperience.length - 1
                  )
                }
              >
                Remove Experience
              </Button>
            )}
          </FormControl>
          <FormControl>
            <FormLabel color={"maroon"}>
              <b>
                <u>Educational Experiences</u>
              </b>
            </FormLabel>
            {formState.educationalExperience.map(
              (experience, experienceIndex) => (
                <VStack key={experienceIndex} spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Degree Name</FormLabel>
                    <Input
                      type="text"
                      value={experience.degreeName}
                      onChange={(e) =>
                        handleInputChange(
                          "educationalExperience",
                          e.target.value,
                          experienceIndex,
                          "degreeName"
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>School Name</FormLabel>
                    <Input
                      type="text"
                      value={experience.schoolName}
                      onChange={(e) =>
                        handleInputChange(
                          "educationalExperience",
                          e.target.value,
                          experienceIndex,
                          "schoolName"
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Time Period</FormLabel>
                    <Input
                      type="text"
                      value={experience.timePeriod}
                      onChange={(e) =>
                        handleInputChange(
                          "educationalExperience",
                          e.target.value,
                          experienceIndex,
                          "timePeriod"
                        )
                      }
                    />
                  </FormControl>
                </VStack>
              )
            )}
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => handleAddExperience("educationalExperience")}
            >
              Add Another Educational Experience
            </Button>
            {formState.educationalExperience.length > 1 && (
              <Button
                variant="outline"
                colorScheme="red"
                onClick={() =>
                  handleRemoveExperience(
                    "educationalExperience",
                    formState.educationalExperience.length - 1
                  )
                }
              >
                Remove Experience
              </Button>
            )}
          </FormControl>
          <Button bgColor={"maroon"} color={"white"} onClick={handleSubmit}>
            Submit
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default DeveloperOnboardingForm;

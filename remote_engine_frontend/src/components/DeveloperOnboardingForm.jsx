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
    email: "",
    selectedSkills: [],
    professionalExperiences: [
      { companyName: "", techStack: "", skillsUsed: "", timePeriod: "" },
    ],
    educationalExperiences: [
      { degreeName: "", schoolName: "", timePeriod: "" },
    ],
  });

  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    console.log("formState:", formState);
    console.log("selectedSkills:", formState.selectedSkills);
    // Fetch predefined skills from the backend
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:3001/skills/");
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
  // -------------------------------------------------------------------
  //   const handleSkillSelection = (selectedSkills) => {
  //     setFormState((prev) => ({ ...prev, selectedSkills }));
  //   };
  //------------------------------------------------------------------------
  const handleSkillSelection = (skill) => {
    if (selectedSkills.includes(skill)) {
      toast({
        title: `Skill '${skill}' is already added.`,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // ========================================================
  const handleAddExperience = (field) => {
    setFormState((prev) => ({
      ...prev,
      [field]: [...prev[field], {}],
    }));
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = selectedSkills.filter((_, i) => i !== index);
    setSelectedSkills(updatedSkills);
  };

  const handleSubmit = async () => {
    let finalFormState = { ...formState, selectedSkills: selectedSkills };

    console.log(finalFormState);
    return;
    try {
      const response = await axios.post("/api/onboarding/submit", formState);
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
            <FormLabel>Skills</FormLabel>
            <Select
              placeholder="Select skills"
              value={formState.selectedSkills}
              onChange={(e) => handleSkillSelection(e.target.value)}
            >
              {allSkills.map((skill) => (
                <option key={skill._id} value={skill.name}>
                  {skill.name}
                </option>
              ))}
            </Select>
            <Box mt={2}>
              {/* {selectedSkills.map((selectedSkill, index) => (
                <CloseButton
                  key={index}
                  size="sm"
                  onClick={() => handleRemoveSkill(index)}
                  ml={2}
                />
              ))} */}
              <Grid gridTemplateColumns={"repeat(3, 1fr)"} gap={3}>
                {selectedSkills.map((el, index) => (
                  <Flex
                    key={index}
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
                      onClick={() => handleRemoveSkill(index)}
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
            <FormLabel color={"maroon"}>
              <b>
                <u>Professional Experiences</u>
              </b>
            </FormLabel>
            {formState.professionalExperiences.map((experience, index) => (
              <VStack key={index} spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    type="text"
                    value={experience.companyName}
                    onChange={(e) =>
                      handleInputChange(
                        "professionalExperiences",
                        e.target.value,
                        index,
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
                        "professionalExperiences",
                        e.target.value,
                        index,
                        "techStack"
                      )
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Skills Used</FormLabel>
                  <Input
                    type="text"
                    value={experience.skillsUsed}
                    onChange={(e) =>
                      handleInputChange(
                        "professionalExperiences",
                        e.target.value,
                        index,
                        "skillsUsed"
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
                        "professionalExperiences",
                        e.target.value,
                        index,
                        "timePeriod"
                      )
                    }
                  />
                </FormControl>
              </VStack>
            ))}
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => handleAddExperience("professionalExperiences")}
            >
              Add Another Professional Experience
            </Button>
          </FormControl>
          <FormControl>
            <FormLabel color={"maroon"}>
              <b>
                <u>Educational Experiences</u>
              </b>
            </FormLabel>
            {formState.educationalExperiences.map((experience, index) => (
              <VStack key={index} spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Degree Name</FormLabel>
                  <Input
                    type="text"
                    value={experience.degreeName}
                    onChange={(e) =>
                      handleInputChange(
                        "educationalExperiences",
                        e.target.value,
                        index,
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
                        "educationalExperiences",
                        e.target.value,
                        index,
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
                        "educationalExperiences",
                        e.target.value,
                        index,
                        "timePeriod"
                      )
                    }
                  />
                </FormControl>
              </VStack>
            ))}
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => handleAddExperience("educationalExperiences")}
            >
              Add Another Educational Experience
            </Button>
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

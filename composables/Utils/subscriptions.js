// composables/Utils/subscriptions.js
// composables/subscriptions.js
// Subscription structure, linking each role to the corresponding tiers
const subscriptions = {
  miseboxUser: [
    {
      tier: "Free",
      prod_id: "prod_QYguS1MA5nbz0i",
      benefits: {
        chef: "Free",
        recruiter: "Free",
        professional: "Free",
        general: ["Basic access to Misebox ecosystem", "Basic account management tools"]
      }
    },
    {
      tier: "Pro",
      prod_id: "prod_QYgs4VFdBiR8wH",
      benefits: {
        chef: "Commis",
        recruiter: "Employer",
        professional: "Skilled",
        general: ["Advanced account management", "Increased network connectivity"]
      }
    },
    {
      tier: "Exec",
      prod_id: "prod_QYen0OlXOCDVYw",
      benefits: {
        chef: "Chef de Partie",
        recruiter: "Headhunter",
        professional: "Expert",
        general: ["Unlimited access to all features", "Premium support and tools"]
      }
    }
  ],
  chef: [
    {
      tier: "Free",
      prod_id: "prod_QYwSaRAs0Vmnsl",
      benefits: ["1 Kitchen", "20 Recipes", "Basic culinary tools"]
    },
    {
      tier: "Commis",
      prod_id: "prod_QYuMG5hT9Zr5XA",
      benefits: ["2 Kitchens", "20 recipes per kitchen", "Access to chef community"]
    },
    {
      tier: "Chef de Partie",
      prod_id: "prod_QYuGwuGGljHVTP",
      benefits: ["Unlimited Kitchens", "Unlimited Recipes", "Premium kitchen resources and community"]
    }
  ],
  professional: [
    {
      tier: "Free",
      prod_id: "prod_QYgvb3PUVof7Tj",
      benefits: ["10 jobs", "Basic job posting", "Job market updates"]
    },
    {
      tier: "Skilled",
      prod_id: "prod_QYgvlxLotdNp7d",
      benefits: ["20 jobs", "Job tracking tools", "Performance insights"]
    },
    {
      tier: "Expert",
      prod_id: "prod_QYgusYLBEs5MVG",
      benefits: ["Unlimited jobs", "Exclusive job offers", "Access to job analytics"]
    }
  ],
  recruiter: [
    {
      tier: "Free",
      prod_id: "prod_QYwWseYW5asqDn",
      benefits: ["10 hires", "Basic listing", "Access to recruitment network"]
    },
    {
      tier: "Employer",
      prod_id: "prod_QYwV29bZVBo49m",
      benefits: ["20 hires", "Standard listing", "Access to some premium candidates"]
    },
    {
      tier: "Headhunter",
      prod_id: "prod_QYwUFdDNjnbxFQ",
      benefits: ["Unlimited hires", "Enhanced recruitment tools", "Priority support"]
    }
  ]
};

// Export the subscriptions object
export default subscriptions;

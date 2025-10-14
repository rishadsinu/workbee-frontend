import { cn } from "@/lib/utils"
import Stepper, { Step } from "../ui/stepper"
import {
  CardContent,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function ApplyWorkerForm({ className, ...props }: React.ComponentProps<"div">) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    workType: "",
    preferredWork: "",
    confirmations: {
      reliable: false,
      experienced: false,
      honest: false,
      termsAccepted: false,
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheckbox = (name: string) => {
    setForm((prev) => ({
      ...prev,
      confirmations: {
        ...prev.confirmations,
        [name]: !prev.confirmations[name as keyof typeof prev.confirmations],
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        
        <CardContent>
           
          <Stepper
            initialStep={1}
            onStepChange={(step) => console.log("Current Step:", step)}
            onFinalStepCompleted={() => console.log("All steps completed")}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            {/* ---------- STEP 1: PERSONAL INFO ---------- */}
            
            <Step>
              <form className="flex flex-col gap-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </Field>
                </FieldGroup>
              </form>
            </Step>

            {/* ---------- STEP 2: LOCATION ---------- */}
            <Step>
              <form className="flex flex-col gap-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="location">Location</FieldLabel>
                    <Input
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City / State / Country"
                      required
                    />
                  </Field>
                </FieldGroup>
              </form>
            </Step>

            {/* ---------- STEP 3: WORK DETAILS ---------- */}
            <Step>
              <form className="flex flex-col gap-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="workType">Work Type</FieldLabel>
                    <Input
                      id="workType"
                      name="workType"
                      value={form.workType}
                      onChange={handleChange}
                      placeholder="E.g., Electrician, Plumber, etc."
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="preferredWork">Preferred Work</FieldLabel>
                    <Input
                      id="preferredWork"
                      name="preferredWork"
                      value={form.preferredWork}
                      onChange={handleChange}
                      placeholder="Your preferred work type"
                      required
                    />
                  </Field>
                </FieldGroup>
              </form>
            </Step>

            {/* ---------- STEP 4: CONFIRMATION ---------- */}
            <Step>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="text-lg font-medium mb-2">Confirm the following:</h3>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={form.confirmations.reliable}
                      onCheckedChange={() => handleCheckbox("reliable")}
                    />
                    <span>I am a reliable worker</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={form.confirmations.experienced}
                      onCheckedChange={() => handleCheckbox("experienced")}
                    />
                    <span>I have experience in my chosen work type</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={form.confirmations.honest}
                      onCheckedChange={() => handleCheckbox("honest")}
                    />
                    <span>I promise to complete assigned work honestly</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={form.confirmations.termsAccepted}
                      onCheckedChange={() => handleCheckbox("termsAccepted")}
                      required
                    />
                    <span>I agree to the terms and conditions</span>
                  </label>
                </div>

              </form>
            </Step>
          </Stepper>
        </CardContent>
    </div>
  )
}

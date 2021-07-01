import Input from "@components/ui/input";
import Layout from "@components/layout/layout";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import { useContactMutation } from "@data/customer/use-contact.mutation";
import { siteSettings } from "@settings/site.settings";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const contactFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
});

export const ContactPage = () => {
  const { mutate, isLoading } = useContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactFormSchema) });
  function onSubmit(values: any) {
    mutate(values);
    reset();
  }
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
        {/* sidebar */}
        <div className="w-full md:w-72 lg:w-96 bg-white p-5 flex-shrink-0 order-2 md:order-1">
          <div className="w-full flex items-center justify-center overflow-hidden mb-8">
            <img
              src="/contact-illustration.svg"
              alt="contact"
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">Address</span>
            <span className="text-sm text-body">
              {siteSettings.author.address}
            </span>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">Phone</span>
            <span className="text-sm text-body">
              {siteSettings.author.phone}
            </span>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-3">Website</span>
            <div className="flex items-center justify-between">
              <span className="text-sm text-body">
                {siteSettings.author.websiteUrl}
              </span>
              <a
                href={siteSettings.author.websiteUrl}
                target="_blank"
                className="text-sm text-primary font-semibold hover:text-primary-2 focus:outline-none focus:text-blue-500"
              >
                Visit This Site
              </a>
            </div>
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold text-heading mb-4">Follow Us</span>
            <div className="flex items-center justify-start">
              {siteSettings.author.social?.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  className={`text-gray-400 focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:${item.hoverClass}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ml-7 lg:ml-9 p-8 bg-white">
          <h1 className="mb-7 text-xl md:text-2xl font-body font-bold text-heading">
            Questions, Comments, Or Concerns?
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Name"
                {...register("name")}
                variant="outline"
                error={errors.name?.message}
              />
              <Input
                label="Email"
                {...register("email")}
                type="email"
                variant="outline"
                error={errors.email?.message}
              />
            </div>

            <Input
              label="Subject"
              {...register("subject")}
              variant="outline"
              className="my-6"
              error={errors.subject?.message}
            />

            <TextArea
              label="Description"
              {...register("description")}
              variant="outline"
              className="my-6"
              rows={6}
              error={errors.description?.message}
            />

            <Button loading={isLoading} disabled={isLoading}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
ContactPage.Layout = Layout;
export default ContactPage;

// SignInModal.js
import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const SignInModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (!values?.email || !values?.password) {
          toast.error("Please enter both email and password.");
          return;
        }

        const signInResult = await signIn("credentials", {
          email: values?.email,
          password: values?.password,
          redirect: false,
        });

        if (signInResult?.error) {
          if (signInResult.error === "No such user found") {
            toast.error("User not found. Please register.");
            loginModal.onClose();
            registerModal.onOpen();
          } else {
            toast.error(signInResult.error);
          }
        } else {
          toast.success("Logged in");
          loginModal.onClose();
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error("Something went wrong!");
      } finally {
      }
    },
  });

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  );

  const bodyContent = (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <Input
        name="email"
        placeholder="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        disabled={formik.isSubmitting}
        isError={!!(formik.touched.email && formik.errors.email)}
      />

      <Input
        name="password"
        placeholder="Password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        disabled={formik.isSubmitting}
        isError={!!(formik.touched.password && formik.errors.password)}
      />

      {/* Add a "Forgot Password?" link/button here if needed */}
    </form>
  );

  return (
    <Modal
      disabled={formik.isSubmitting}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel={formik.isSubmitting ? "Signing in..." : "Sign in"}
      onClose={loginModal.onClose}
      onSubmit={formik.handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SignInModal;

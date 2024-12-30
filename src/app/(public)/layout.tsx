"use client";
import { Box, styled } from "@mui/material";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageContainer = styled(Box)(() => ({
  display: "grid",
  placeItems: "center",
  height: "100vh",
}));

const BlankLayout = (props: Props) => {
  return <PageContainer>{props.children}</PageContainer>;
};

export default BlankLayout;

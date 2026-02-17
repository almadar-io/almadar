/**
 * LoginTemplate - Pure presentational login/signup page
 *
 * Replaces the inline-styled Login page with @almadar/ui atoms and CSS variables.
 *
 * Events Emitted:
 * - UI:GOOGLE_SIGN_IN - Google button click
 * - UI:EMAIL_AUTH - Email form submit { email, password, displayName, isSignUp }
 * - UI:TOGGLE_MODE - Toggle between signIn/signUp
 * - UI:COMPLETE_EMAIL_LINK - Complete email link { email }
 * - UI:FIELD_CHANGE - Field value changes { field, value }
 */

import React from "react";
import {
  Card,
  CardContent,
  VStack,
  HStack,
  Box,
  Button,
  Typography,
  Heading,
  Input,
  Divider,
  Alert,
  cn,
  useEventBus,
} from "@almadar/ui";

export interface LoginTemplateProps {
  entity: {
    mode: "signIn" | "signUp" | "completingEmailLink";
    loading: boolean;
    error: string | null;
    email: string;
    password: string;
    displayName: string;
    emailForLinkCompletion: string;
  };
  className?: string;
}

const headingByMode: Record<LoginTemplateProps["entity"]["mode"], string> = {
  signIn: "Sign In",
  signUp: "Create Account",
  completingEmailLink: "Complete Sign In",
};

export const LoginTemplate: React.FC<LoginTemplateProps> = ({
  entity,
  className,
}) => {
  const { emit } = useEventBus();

  const handleFieldChange = (field: string, value: string) => {
    emit("UI:FIELD_CHANGE", { field, value });
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    emit("UI:EMAIL_AUTH", {
      email: entity.email,
      password: entity.password,
      displayName: entity.displayName,
      isSignUp: entity.mode === "signUp",
    });
  };

  const handleCompleteEmailLink = (e: React.FormEvent) => {
    e.preventDefault();
    emit("UI:COMPLETE_EMAIL_LINK", { email: entity.emailForLinkCompletion });
  };

  return (
    <Box
      className={cn(
        "min-h-screen w-full flex items-center justify-center",
        "bg-[var(--color-surface)]",
        className,
      )}
    >
      <Card
        variant="elevated"
        padding="lg"
        className="w-full max-w-md"
      >
        <CardContent>
          <VStack gap="lg">
            <Heading level={2} className="text-center text-[var(--color-foreground)]">
              {headingByMode[entity.mode]}
            </Heading>

            {entity.error && (
              <Alert variant="error">{entity.error}</Alert>
            )}

            {entity.mode === "completingEmailLink" ? (
              <Box as="form" onSubmit={handleCompleteEmailLink}>
                <VStack gap="md">
                  <Typography
                    variant="body2"
                    className="text-[var(--color-muted-foreground)] text-center"
                  >
                    Enter your email to complete sign in.
                  </Typography>
                  <Input
                    inputType="email"
                    placeholder="Email address"
                    value={entity.emailForLinkCompletion}
                    onChange={(e) =>
                      handleFieldChange("emailForLinkCompletion", e.target.value)
                    }
                    disabled={entity.loading}
                  />
                  <Button
                    variant="primary"
                    className="w-full"
                    disabled={entity.loading}
                    type="submit"
                  >
                    {entity.loading ? "Completing..." : "Complete Sign In"}
                  </Button>
                </VStack>
              </Box>
            ) : (
              <VStack gap="md">
                {/* Google sign-in */}
                <Button
                  variant="secondary"
                  className="w-full"
                  disabled={entity.loading}
                  onClick={() => emit("UI:GOOGLE_SIGN_IN", {})}
                >
                  Sign in with Google
                </Button>

                <Divider label="or" />

                {/* Email / password form */}
                <Box as="form" onSubmit={handleEmailAuth}>
                  <VStack gap="md">
                    {entity.mode === "signUp" && (
                      <Input
                        inputType="text"
                        placeholder="Display name"
                        value={entity.displayName}
                        onChange={(e) =>
                          handleFieldChange("displayName", e.target.value)
                        }
                        disabled={entity.loading}
                      />
                    )}
                    <Input
                      inputType="email"
                      placeholder="Email address"
                      value={entity.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      disabled={entity.loading}
                    />
                    <Input
                      inputType="password"
                      placeholder="Password"
                      value={entity.password}
                      onChange={(e) =>
                        handleFieldChange("password", e.target.value)
                      }
                      disabled={entity.loading}
                    />
                    <Button
                      variant="primary"
                      className="w-full"
                      disabled={entity.loading}
                      type="submit"
                    >
                      {entity.loading
                        ? "Please wait..."
                        : entity.mode === "signUp"
                          ? "Create Account"
                          : "Sign In"}
                    </Button>
                  </VStack>
                </Box>

                {/* Toggle mode link */}
                <HStack justify="center" gap="sm" align="center">
                  <Typography
                    variant="body2"
                    className="text-[var(--color-muted-foreground)]"
                  >
                    {entity.mode === "signUp"
                      ? "Already have an account?"
                      : "Don't have an account?"}
                  </Typography>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[var(--color-primary)] font-medium p-0"
                    onClick={() => emit("UI:TOGGLE_MODE", {})}
                  >
                    {entity.mode === "signUp" ? "Sign In" : "Sign Up"}
                  </Button>
                </HStack>
              </VStack>
            )}
          </VStack>
        </CardContent>
      </Card>
    </Box>
  );
};

LoginTemplate.displayName = "LoginTemplate";

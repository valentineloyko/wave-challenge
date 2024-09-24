import React from "react";
import { render, screen, waitFor } from "../../utils/test-utils";
import EditCustomer from "../EditCustomer";
import { useAppStore } from "../../store/appStore";
import { useParams } from "react-router";
import { useFetchCustomers } from "../../api/fetchCustomers";
import userEvent from "@testing-library/user-event";
import { Customer } from "../../types/customer";

jest.mock("../../store/appStore");

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

jest.mock("../../api/fetchCustomers", () => ({
  useFetchCustomers: jest.fn(),
}));

describe("EditCustomer Component", () => {
  const mockCustomer: Customer = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    channel: "email",
    address: "123 Main St",
    postal: "12345",
    city: "Anytown",
    province: "ON",
    country: "Canada",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  const renderWithProviders = (
    ui: React.ReactElement,
    { customers = [mockCustomer], isLoading = false, error = null } = {}
  ) => {
    (useAppStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ customers })
    );

    (useFetchCustomers as jest.Mock).mockReturnValue({
      isLoading,
      error,
    });

    return render(ui, { route: "/customer/1/edit" });
  };

  test("renders form pre-filled with customer data", async () => {
    renderWithProviders(<EditCustomer />);

    await screen.findByDisplayValue("John Doe");
    await screen.findByDisplayValue("john@example.com");

    expect(screen.getByLabelText("Name")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");
  });

  test("shows validation errors when required fields are empty", async () => {
    renderWithProviders(<EditCustomer />);

    await screen.findByDisplayValue("John Doe");
    await screen.findByDisplayValue("john@example.com");

    userEvent.clear(screen.getByLabelText("Name"));
    userEvent.clear(screen.getByLabelText("Email"));

    userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(
      await screen.findByText("Please enter the name")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please enter the email")
    ).toBeInTheDocument();
  });

  test("logs form data on submit", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    renderWithProviders(<EditCustomer />);

    await screen.findByDisplayValue("John Doe");
    await screen.findByDisplayValue("john@example.com");

    userEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Form values:", {
        address: "123 Main St",
        channel: "email",
        city: "Anytown",
        country: "Canada",
        email: "john@example.com",
        name: "John Doe",
        postal: "12345",
        province: "ON",
      });
    });

    consoleSpy.mockRestore();
  });

  test('shows "Customer not found" if customer does not exist', () => {
    renderWithProviders(<EditCustomer />, { customers: [] });

    expect(screen.getByText("Customer not found")).toBeInTheDocument();
  });
});

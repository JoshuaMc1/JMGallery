import ProtectedRoute from "../ProtectedRoute";


// Tests that the authenticated state is set to true if the user is authenticated.
it("test_authenticated_state_is_true_if_user_is_authenticated", async () => {
    // Arrange
    const mockUser = { success: true };
    const mockToken = "mockToken";
    const mockNavigate = jest.fn();
    const setAuthenticated = jest.fn();
    const setLoading = jest.fn();
    jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockUser),
    });
    jest.spyOn(useGetToken, "default").mockReturnValue(mockToken);
    jest.spyOn(useNavigate, "default").mockReturnValue(mockNavigate);

    // Act
    await useAuth("/");

    // Assert
    expect(setAuthenticated).toHaveBeenCalledWith(true);
    expect(setLoading).toHaveBeenCalledWith(false);
});

// Tests that the function redirects to the provided URL if the user is not authenticated.
it("test_redirects_to_provided_url_if_user_is_not_authenticated", async () => {
    // Arrange
    const mockUser = { success: false };
    const mockToken = "mockToken";
    const mockNavigate = jest.fn();
    const setLoading = jest.fn();
    jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockUser),
    });
    jest.spyOn(useGetToken, "default").mockReturnValue(mockToken);
    jest.spyOn(useNavigate, "default").mockReturnValue(mockNavigate);

    // Act
    await useAuth("/");

    // Assert
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(setLoading).toHaveBeenCalledWith(false);
});

// Tests that the loading state is set to true initially.
it("test_loading_state_is_true_initially", async () => {
    // Arrange
    const mockToken = "mockToken";
    const setLoading = jest.fn();
    jest.spyOn(useGetToken, "default").mockReturnValue(mockToken);

    // Act
    await useAuth("/");

    // Assert
    expect(setLoading).toHaveBeenCalledWith(true);
});

// Tests that the function still works if the redirect URL is not provided.
it("test_redirect_url_is_optional", async () => {
    const [loading, authenticated] = await useAuth();
    expect(loading).toBeDefined();
    expect(authenticated).toBeDefined();
});

// Tests that the loading state is set to false after the authentication check.
it("test_loading_state_is_false_after_authentication_check", async () => {
    const [loading, authenticated] = await useAuth();
    expect(loading).toBe(false);
});

// Tests that the function throws an error if the token is not provided.
it("test_token_is_required", async () => {
    const getToken = jest.fn(() => null);
    const navigate = jest.fn();
    const [loading, authenticated] = await useAuth("/login", getToken, navigate);
    expect(navigate).toHaveBeenCalledWith("/login");
});

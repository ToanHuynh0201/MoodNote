import { STORAGE_KEYS } from "@/constants/auth";
import * as SecureStore from "expo-secure-store";

/**
 * Safely get item from SecureStore
 * @param {string} key - Storage key
 * @param {string} defaultValue - Default value if key doesn't exist
 * @returns {Promise<string>} Parsed value or default
 */
export const getStorageItem = async (
	key: string,
	defaultValue: string = "",
): Promise<string> => {
	try {
		const item = await SecureStore.getItemAsync(key);
		if (item) {
			try {
				return JSON.parse(item);
			} catch {
				return item;
			}
		}

		return defaultValue;
	} catch (error) {
		console.warn(`Error reading SecureStore key ${key}:`, error);
		return defaultValue;
	}
};

/**
 * Safely set item in SecureStore
 * @param {string} key - Storage key
 * @param {*} value - Value to store (will be stringified)
 * @returns {Promise<boolean>} Success status
 */
export const setStorageItem = async (
	key: string,
	value: any,
): Promise<boolean> => {
	try {
		const stringValue =
			typeof value === "string" ? value : JSON.stringify(value);

		await SecureStore.setItemAsync(key, stringValue);
		return true;
	} catch (error) {
		console.warn(`Error writing to SecureStore key "${key}":`, error);
		return false;
	}
};

/**
 * Safely remove item from SecureStore
 * @param {string} key - Storage key
 * @returns {Promise<boolean>} Success status
 */
export const removeStorageItem = async (key: string): Promise<boolean> => {
	try {
		await SecureStore.deleteItemAsync(key);
		return true;
	} catch (error) {
		console.warn(`Error writing to SecureStore key "${key}":`, error);
		return false;
	}
};

/**
 * Check if SecureStore is available
 * @returns {Promise<boolean>} Availability status
 */
export const isStorageAvailable = async (): Promise<boolean> => {
	try {
		const test = "__storage_test__";
		await SecureStore.setItemAsync(test, test);
		await SecureStore.deleteItemAsync(test);
		return true;
	} catch {
		return false;
	}
};

/**
 * Clear all sensitive data from SecureStore
 * This removes all known app keys
 * @returns {Promise<boolean>} Success status
 */
export const clearStorage = async (): Promise<boolean> => {
	try {
		const keys = Object.values(STORAGE_KEYS);
		await Promise.all(keys.map((key) => SecureStore.deleteItemAsync(key)));
		return true;
	} catch (error) {
		console.warn("Error clearing all SecureStore:", error);
		return false;
	}
};

/**
 * Clear specific storage items
 * @param {string[]} keys - Array of keys to remove
 * @returns {Promise<boolean>} Success status
 */
export const clearStorageItems = async (keys: string[]): Promise<boolean> => {
	try {
		await Promise.all(keys.map((key) => SecureStore.deleteItemAsync(key)));
		return true;
	} catch (error) {
		console.warn("Error clearing SecureStore items:", error);
		return false;
	}
};

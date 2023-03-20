import { Component, createSignal, For } from "solid-js";

import "flowbite";
import { qualityProfiles } from "./qualityProfiles";

const averageEpisodeLength = 24;
const averageEpisodes = 25;
const averageSeasons = 8;

const averageMovieLength = 60 * 1.5;

const App: Component = () => {
  const [showProfiles, setShowProfiles] = createSignal<
    Array<keyof typeof qualityProfiles>
  >([]);

  const [movieProfiles, setMovieProfiles] = createSignal<
    Array<keyof typeof qualityProfiles>
  >([]);

  const [availableStorage, setAvailableStorage] = createSignal(0);
  const [ratio, setRatio] = createSignal(50);

  const averageShowSize = () => {
    let averageSize = 0;

    for (const qualityProfile of showProfiles()) {
      const sizes = qualityProfiles[qualityProfile];
      const _averageSize = (sizes[0] + sizes[1]) / 2;
      averageSize += _averageSize;
    }

    return averageSize;
  };

  const averageEpisodeSize = () => averageShowSize() * averageEpisodeLength;

  const showStorage = () =>
    availableStorage() * 1_000_000 * ((100 - ratio()) / 100);

  const shows = () =>
    showStorage() / (averageEpisodeSize() * averageEpisodes * averageSeasons);

  const averageMovieSize = () => {
    let averageSize = 0;

    for (const qualityProfile of movieProfiles()) {
      const sizes = qualityProfiles[qualityProfile];
      const _averageSize = (sizes[0] + sizes[1]) / 2;
      averageSize += _averageSize;
    }

    return averageSize;
  };

  const movieStorage = () => availableStorage() * 1_000_000 * (ratio() / 100);

  const movies = () =>
    movieStorage() / (averageMovieSize() * averageMovieLength);

  return (
    <main class="p-8 min-h-screen dark:bg-slate-600">
      <h1 class="text-5xl mb-12 text-white font-head">Media Hoarder</h1>
      <div class="flex flex-col gap-4 mb-8 md:mb-8 lg:mb-16">
        <div class="flex flex-col gap-2">
          <h2 class="dark:text-gray-200 text-xl">Series Quality</h2>
          <ul class="items-center w-full text-sm font-medium flex flex-col md:flex-row">
            <For each={Object.entries(qualityProfiles)}>
              {([qualityProfile]) => (
                <li class="w-full">
                  <div class="flex items-center">
                    <input
                      id={`shows-${qualityProfile}-option`}
                      type="checkbox"
                      value={qualityProfile}
                      class="hidden peer"
                      oninput={(e) => {
                        if (e.currentTarget.checked) {
                          setShowProfiles([
                            ...showProfiles(),
                            qualityProfile as keyof typeof qualityProfiles,
                          ]);
                        } else {
                          setShowProfiles(
                            showProfiles().filter(
                              (profile) => profile !== qualityProfile
                            )
                          );
                        }
                      }}
                    />
                    <label
                      for={`shows-${qualityProfile}-option`}
                      class="inline-flex items-center justify-between w-full p-2 md:p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div class="w-full text-lg font-semibold">
                        {qualityProfile}
                      </div>
                    </label>
                  </div>
                </li>
              )}
            </For>
          </ul>
          <p class="dark:text-gray-300">
            Average size: {averageShowSize()}MB/Min.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h2 class="dark:text-gray-200 text-xl">Movie Quality</h2>
          <ul class="items-center w-full text-sm font-medium flex flex-col md:flex-row">
            <For each={Object.entries(qualityProfiles)}>
              {([qualityProfile]) => (
                <li class="w-full">
                  <div class="flex items-center">
                    <input
                      id={`movies-${qualityProfile}-option`}
                      type="checkbox"
                      value={qualityProfile}
                      class="hidden peer"
                      oninput={(e) => {
                        if (e.currentTarget.checked) {
                          setMovieProfiles([
                            ...movieProfiles(),
                            qualityProfile as keyof typeof qualityProfiles,
                          ]);
                        } else {
                          setMovieProfiles(
                            movieProfiles().filter(
                              (profile) => profile !== qualityProfile
                            )
                          );
                        }
                      }}
                    />
                    <label
                      for={`movies-${qualityProfile}-option`}
                      class="inline-flex items-center justify-between w-full p-2 md:p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div class="w-full text-lg font-semibold">
                        {qualityProfile}
                      </div>
                    </label>
                  </div>
                </li>
              )}
            </For>
          </ul>
          <p class="dark:text-gray-300">
            Average size: {(averageMovieSize() * 60) / 1000}GB/h
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <label for="storage" class="block dark:text-gray-200 text-xl">
            Available storage (TB)
          </label>
          <input
            type="number"
            id="storage"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="00 TB"
            oninput={(e) => setAvailableStorage(e.currentTarget.valueAsNumber)}
            value={availableStorage()}
            required
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="ratio"
            class="block font-medium text-xl text-gray-900 dark:text-gray-200"
          >
            Ratio
          </label>
          <div class="flex gap-4 items-center">
            <p class="dark:text-gray-200">
              Shows
              <br />
              <span class="text-gray-300">{100 - ratio()}%</span>
            </p>
            <input
              id="ratio"
              type="range"
              min={0}
              max={100}
              value={ratio()}
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800"
              data-tooltip-target="ratio-tooltip"
              oninput={(e) => setRatio(e.currentTarget.valueAsNumber)}
            />
            <p class="dark:text-gray-200">
              Movies
              <br />
              <span class="text-gray-300">{ratio()}%</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center md:flex-row md:items-stretch gap-12">
        {showProfiles().length > 0 && (
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {new Intl.NumberFormat(navigator.language ?? "en-US", {
                maximumFractionDigits: 0,
              }).format(shows())}{" "}
              Shows
            </h3>
            <p class="font-normal text-gray-700 dark:text-gray-400 mb-2">
              Assuming an average show has {averageSeasons} seasons, with{" "}
              {averageEpisodes} episodes and each episode has a runtime of{" "}
              {averageEpisodeLength} minutes.
            </p>
            <p class="font-normal text-gray-800 dark:text-gray-300 mt-auto">
              {new Intl.NumberFormat(navigator.language ?? "en-US", {
                maximumFractionDigits: 2,
              }).format(showStorage() / 1_000_000)}{" "}
              TB available to Shows
            </p>
          </div>
        )}
        {movieProfiles().length > 0 && (
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {new Intl.NumberFormat(navigator.language ?? "en-US", {
                maximumFractionDigits: 0,
              }).format(movies())}{" "}
              Movies
            </h3>
            <p class="font-normal text-gray-700 dark:text-gray-400 mb-2">
              Assuming an average movie runs for {averageMovieLength} minutes.
            </p>
            <p class="font-normal text-gray-800 dark:text-gray-300 mt-auto">
              {new Intl.NumberFormat(navigator.language ?? "en-US", {
                maximumFractionDigits: 2,
              }).format(movieStorage() / 1_000_000)}{" "}
              TB available to Movies
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;

import {localize} from "./Localization";
import {asyncFetchJson, ContentNode, Expandable} from "./Common";
import React from "react";
import {getCurrentThemeColors} from "./ColorTheme";

type EntryProps = {
	name: ContentNode,
	plan: string,
	markers?: string,
}

// Containment Bay Z1T9 Extreme - Zurvan
// The Abyssal Fracture Extreme - Zeromus

function Entry(props: EntryProps) {
	const markersPathPrefix: string = "/ffxiv-blm-rotation-endwalker/gallery/markers/";
	const planPathPrefix: string = "/ffxiv-blm-rotation-endwalker/gallery/plans/";
	return <div>
		<span style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=>{
			// markers (if any)
			if (props.markers !== undefined) {
				asyncFetchJson(markersPathPrefix + props.markers, data => {
					console.log(data);
				});
			}
			// plan
			asyncFetchJson(planPathPrefix + props.plan, data => {
				console.log(data);
			});
		}}>{props.name}</span>
	</div>
}

function Fight(props: {name: ContentNode, plans: EntryProps[]}) {
	return <div>
		<div><b>{props.name}</b></div>
		<div style={{marginLeft: 20}}>
			{props.plans.map(entry => <Entry key={entry.plan} {...entry}/>)}
		</div>
	</div>
}

export function EndwalkerGallery() {
	let colors = getCurrentThemeColors();
	return <div style={{
		borderRadius: 4,
		border: "1px solid " + colors.accent,
		padding: "5px 10px",
		margin: "20px 0"
	}}>
		<Expandable
			defaultShow={true}
			title={"plans-gallery"}
			titleNode={<span style={{color: colors.accent}}>{localize({en: "Endwalker Black Mage's Fight Plans Gallery"})}</span>}
			content={<div>
				<div className={"paragraph"}>{localize({
					en: "This is an effort to showcase and recognize Endwalker Black Mages' love and dedication to this job."
				})}</div>
				{localize({
					en: <div className={"paragraph"}>
						<div>How to view:</div>
						<ol>
							<li>Save or clear all timeline markers and the current timeline slot</li>
							<li>Click on a plan below to load both the fight plan and its corresponding
								markers
							</li>
						</ol>
					</div>
				})}
				<Fight name={"P9S"} plans={[
					{
						name: localize(({en: "2.42 rd plan", zh: "2.42 rd轴"})),
						plan: "P9S 2.42 rd轴 ①.txt",
						markers: "p9s.txt"
					},
					{
						name: localize(({en: "Speedrun", zh: "速刷"})),
						plan: "P9S 速刷.txt",
						markers: "p9s.txt"
					},
					{
						name: localize(({en: "No B3/B4", zh: "零冰3冰4"})),
						plan: "P9S 零冰3冰4.txt",
						markers: "p9s.txt"
					}
				]}/>
			</div>}/>

	</div>

}
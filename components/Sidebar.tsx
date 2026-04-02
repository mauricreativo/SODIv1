
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Megaphone, Briefcase } from 'lucide-react';

const DashboardIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
);

const BusinessIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
);

const PromotionsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
);

const UtensilsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m6-15a6 6 0 11-12 0 6 6 0 0112 0zm-6 0h.01" />
    </svg>
);

const LandmarkIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 21V5m0 16h5m5 0h5M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4m-6 0h6" />
    </svg>
);

const MountainIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M5 15l4-8 4 8M13 15l4-8 4 8" />
    </svg>
);

const CalendarDaysIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);

const AttributeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
);

const PlansIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
);

const SectorsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0h-2m-2 0h-2m-2 0H9m-2 0H5"></path></svg>
);

const TrekkingIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

interface NavItem {
    name: string;
    icon: React.ReactNode;
    subItems?: NavItem[];
}

interface NavItemProps {
    item: NavItem;
    activeView: string;
    setActiveView: (view: string) => void;
    isSubItem?: boolean;
}

const SortableNavItem: React.FC<NavItemProps> = ({ item, activeView, setActiveView, isSubItem = false }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.name });

    const [isExpanded, setIsExpanded] = useState(true);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
        <li ref={setNodeRef} style={style} className="mb-1 group">
            <div className="flex items-center">
                <div
                    {...attributes}
                    {...listeners}
                    className={`p-1 cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity ${isSubItem ? 'ml-4' : ''}`}
                >
                    <GripVertical size={14} />
                </div>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (hasSubItems) {
                            setIsExpanded(!isExpanded);
                        }
                        setActiveView(item.name);
                    }}
                    className={`flex-1 flex items-center p-2 rounded-lg transition-colors duration-200 ${
                        isSubItem ? 'ml-2 py-1.5 text-sm' : ''
                    } ${
                        activeView === item.name
                            ? 'bg-[#f06c44]/20 text-[#f06c44] shadow-md'
                            : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    <span className={isSubItem ? 'scale-75' : ''}>{item.icon}</span>
                    <span className={`ml-3 font-medium ${isSubItem ? 'text-xs' : ''}`}>{item.name}</span>
                    {hasSubItems && (
                        <svg 
                            className={`w-4 h-4 ml-auto transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    )}
                </a>
            </div>
            {hasSubItems && isExpanded && (
                <SortableContext
                    items={item.subItems!.map(i => i.name)}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="mt-1 ml-4 border-l border-slate-700">
                        {item.subItems!.map((subItem) => (
                            <SortableNavItem 
                                key={subItem.name} 
                                item={subItem} 
                                activeView={activeView} 
                                setActiveView={setActiveView} 
                                isSubItem={true}
                            />
                        ))}
                    </ul>
                </SortableContext>
            )}
        </li>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
    const [navItems, setNavItems] = useState<NavItem[]>([
        { name: 'Dashboard', icon: <DashboardIcon /> },
        { 
            name: 'Negocios', 
            icon: <BusinessIcon />,
            subItems: [
                { name: 'Atributos', icon: <AttributeIcon /> },
            ]
        },
        { 
            name: 'Marketing', 
            icon: <Megaphone className="w-6 h-6" />,
            subItems: [
                { name: 'Promociones', icon: <PromotionsIcon /> },
            ]
        },
        { 
            name: 'Gestión Turística', 
            icon: <Briefcase className="w-6 h-6" />,
            subItems: [
                { name: 'Sectores', icon: <SectorsIcon /> },
                { name: 'Rutas Gastronómicas', icon: <UtensilsIcon /> },
                { name: 'Patrimonio y Ruralidad', icon: <LandmarkIcon /> },
                { name: 'GeoTurismo', icon: <MountainIcon /> },
                { name: 'Calendario de Identidad', icon: <CalendarDaysIcon /> },
                { name: 'Trekking', icon: <TrekkingIcon /> },
            ]
        },
        { name: 'Planes', icon: <PlansIcon /> },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setNavItems((items) => {
                // This is a simplified move that only works for top-level items
                // For a truly nested sortable, we'd need a more complex logic
                // But since the user wants to move "sections", top-level move is usually enough
                const oldIndex = items.findIndex((i) => i.name === active.id);
                const newIndex = items.findIndex((i) => i.name === over.id);
                
                if (oldIndex !== -1 && newIndex !== -1) {
                    return arrayMove(items, oldIndex, newIndex);
                }
                
                // Handle sub-item moves within the same parent (simplified)
                const newItems = [...items];
                for (const parent of newItems) {
                    if (parent.subItems) {
                        const subOldIndex = parent.subItems.findIndex(i => i.name === active.id);
                        const subNewIndex = parent.subItems.findIndex(i => i.name === over.id);
                        if (subOldIndex !== -1 && subNewIndex !== -1) {
                            parent.subItems = arrayMove(parent.subItems, subOldIndex, subNewIndex);
                            return newItems;
                        }
                    }
                }

                return items;
            });
        }
    };

    return (
        <aside className="w-64 bg-slate-800 flex-shrink-0 p-4 flex flex-col border-r border-slate-700">
            <div className="flex flex-col mb-10 px-2">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="text-3xl font-black tracking-tighter text-white italic">SODI</span>
                        <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#f06c44] rounded-full"></div>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-[#2c6b8f] uppercase tracking-widest">Control</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tower</span>
                    </div>
                </div>
            </div>
            <nav className="flex-1 overflow-y-auto custom-scrollbar">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={navItems.map(i => i.name)}
                        strategy={verticalListSortingStrategy}
                    >
                        <ul>
                            {navItems.map((item) => (
                                <SortableNavItem
                                    key={item.name}
                                    item={item}
                                    activeView={activeView}
                                    setActiveView={setActiveView}
                                />
                            ))}
                        </ul>
                    </SortableContext>
                </DndContext>
            </nav>
            <div className="mt-auto pt-4 border-t border-slate-700">
                 <div className="text-center text-xs text-slate-500">
                    <p>&copy; 2024 TurismoTomé</p>
                    <p>INN-CORE: Enterprise Edition</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
